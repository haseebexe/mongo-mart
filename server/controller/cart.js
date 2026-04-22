import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import TryCatch from "../utils/TryCatch.js";

export const addToCart = TryCatch(async (req, res) => {
  const { product } = req.body;

  const cart = await Cart.findOne({
    product: product,
    user: req.user._id,
  }).populate("product");

  if (cart) {
    if (cart.product.stock === cart.quantity)
      return res.status(400).json({ message: "Out of stock" });

    cart.quantity = cart.quantity + 1;

    await cart.save();

    return res.json({ message: "Added to cart" });
  }

  const cartProd = await Product.findById(product);

  if (cartProd.stock === 0)
    return res.status(400).json({ message: "Out of stock" });

  await Cart.create({
    product: product,
    user: req.user._id,
    quantity: 1,
  });

  res.json({ message: "Added to cart" });
});

export const removeCart = TryCatch(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  await cart.deleteOne();

  res.json({ message: "Removed from cart" });
});

export const updateCart = TryCatch(async (req, res) => {
  const { id } = req.body;

  const { action } = req.query;

  if (action === "inc") {
    const cart = await Cart.findById(id).populate("product");

    if (cart.quantity < cart.product.stock) {
      await cart.quantity++;
      await cart.save();
    } else {
      return res.status(400).json({ message: "Out of stock" });
    }

    res.json({ message: "Cart updated" });
  }

  if (action === "dec") {
    const cart = await Cart.findById(id).populate("product");

    if (cart.quantity > 1) {
      await cart.quantity--;
      await cart.save();
    } else {
      return res.status(400).json({ message: "You have only one item" });
    }

    res.json({ message: "Cart updated" });
  }
});

export const fetchCart = TryCatch(async (req, res) => {
  const cart = await Cart.find({ user: req.user._id }).populate("product");

  const sumOfQuantities = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  let subTotal = 0;

  cart.forEach((i) => {
    const itemSubtotal = i.quantity * i.product.price;
    subTotal += itemSubtotal;
  });

  res.json({
    cart,
    subTotal,
    sumOfQuantities,
  });
});
