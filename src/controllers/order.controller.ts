import type { Request, Response } from "express";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

const sanitize = (doc: any) => {
  const { __v, _id, ...rest } = doc.toObject();
  return { id: _id, ...rest };
};

const calculateTotal = async (
  products: { productId: string; quantity: number }[]
): Promise<number> => {
  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product) throw new Error(`Product ${item.productId} not found`);
    total += product.price * item.quantity;
  }
  return total;
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().select("-__v");
    res.json(orders.map((o) => sanitize(o)));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).select("-__v");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(sanitize(order));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    let total: number;
    try {
      total = await calculateTotal(products);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }

    const order = await Order.create({ userId, products, total });
    res.status(201).json(sanitize(order));
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;

    let total: number | undefined;
    if (products) {
      try {
        total = await calculateTotal(products);
      } catch (err: any) {
        return res.status(400).json({ message: err.message });
      }
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...(total !== undefined && { total }) },
      { new: true }
    ).select("-__v");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(sanitize(order));
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};
