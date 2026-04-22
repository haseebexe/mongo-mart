import { Cart } from "../models/Cart.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import sendOrderConfirmation from "../utils/sendOrderConfirmation.js";
import TryCatch from "../utils/TryCatch.js";

export const newOrderCod = TryCatch(async (req, res) => {
  const { method, address, phone } = req.body;

  const cart = await Cart.find({ user: req.user._id }).populate({
    path: "product",
    select: "title price",
  });

  if (!cart.length) return res.status(400).json({ message: "Cart is empty" });

  let subTotal = 0;

  const items = cart.map((i) => {
    const itemSubTotal = i.quantity * i.product.price;

    subTotal += itemSubTotal;

    return {
      product: i.product._id,
      name: i.product.title,
      price: i.product.price,
      quantity: i.quantity,
    };
  });

  const order = await Order.create({
    items,
    method,
    user: req.user._id,
    address,
    phone,
    subTotal,
  });

  for (let i of order.items) {
    const product = await Product.findById(i.product);

    if (product) {
      product.stock -= i.quantity;
      product.sold += i.quantity;

      await product.save();
    }
  }

  await Cart.deleteMany({ user: req.user._id });

  await sendOrderConfirmation({
    email: req.user.email,
    subject: "Order confirmation",
    orderId: order._id,
    products: items,
    totalAmount: subTotal,
  });

  res.json({
    message: "Order has been created successfully",
    order,
  });
});

export const getAllOrders = TryCatch(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json({ orders: orders.reverse() });
});

export const getAllOrdersAdmin = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    res.status(403).json({ message: "You are not admin" });

  const orders = await Order.find().populate("user").sort({
    createdAt: -1,
  });

  res.json(orders);
});

export const getSingleOrder = TryCatch(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.product")
    .populate("user");

  res.json(order);
});

export const updateStatus = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    res.status(403).json({ message: "You are not admin" });

  const order = await Order.findById(req.params.id);

  const { status } = req.body;

  order.status = status;

  await order.save();

  res.json({ message: "Order status updated", order });
});

export const getStats = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    res.status(403).json({ message: "You are not admin" });

  const cod = await Order.find({ method: "cod" }).countDocuments();
  const online = await Order.find({ method: "online" }).countDocuments();

  const products = await Product.find();

  const data = products.map((prod) => ({
    name: prod.title,
    sold: prod.sold,
    stock: prod.stock,
  }));

  res.json({
    cod,
    online,
    data,
  });
});
