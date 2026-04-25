import { Product } from "../models/Product.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";

export const createProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "You are not admin" });

  const { title, description, price, category, stock } = req.body;

  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({ message: "No files to upload" });

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);

    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  const product = await Product.create({
    title,
    description,
    price,
    category,
    images: uploadedImage,
    stock,
  });

  res.status(201).json({ message: "Product created successfully", product });
});

export const getAllProducts = TryCatch(async (req, res) => {
  const { search, category, page, sortByPrice } = req.query;

  const filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  const limit = 8;

  const skip = (page - 1) * limit;

  let sortOption = { createdAt: -1 };

  if (sortByPrice === "lowToHigh") {
    sortOption = { price: 1 };
  } else if (sortByPrice === "highToLow") {
    sortOption = { price: -1 };
  }

  const products = await Product.find(filter)
    .sort(sortOption)
    .limit(limit)
    .skip(skip);

  const categories = await Product.distinct("category");

  const newProduct = await Product.find().sort("-createdAt").limit(10);

  const countProduct = await Product.countDocuments();

  const totalPages = Math.ceil(countProduct / limit);

  res.json({
    products,
    categories,
    newProduct,
    totalPages,
  });
});

export const getSingleProduct = TryCatch(async (req, res) => {
  const product = await Product.findById(req.params.id);

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  });

  res.json({
    product,
    relatedProducts,
  });
});

export const updateProduct = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "You are not admin" });

  const { title, description, price, category, stock } = req.body;

  const updateFields = {};

  if (title) updateFields.title = title;
  if (description) updateFields.description = description;
  if (price) updateFields.price = price;
  if (category) updateFields.category = category;
  if (stock) updateFields.stock = stock;

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });

  res.json({ message: "Product updated successfully", updatedProduct });
});

export const updateProductImage = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "You are not admin" });

  const { id } = req.params;
  const files = req.files;

  if (!files || files.length === 0)
    return res.status(400).json({ message: "No files to upload" });

  const product = await Product.findById(id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  const oldImages = product.images || [];

  for (const img of oldImages) {
    if (img.id) {
      await cloudinary.v2.uploader.destroy(img.id);
    }
  }

  const imageUploadPromises = files.map(async (file) => {
    const fileBuffer = bufferGenerator(file);

    const result = await cloudinary.v2.uploader.upload(fileBuffer.content);

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  });

  const uploadedImage = await Promise.all(imageUploadPromises);

  product.images = uploadedImage;

  await product.save();

  res.json({
    message: "Image updated",
    product,
  })
});
