import type { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";

const sanitize = (doc: any) => {
  const { __v, _id, ...rest } = doc.toObject();
  return { id: _id, ...rest };
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const filter = req.query.categoryId ? { categoryId: req.query.categoryId } : {};
    const products = await Product.find(filter).select("-__v");
    res.json(products.map((p) => sanitize(p)));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(sanitize(product));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).json({ message: "Category not found" });

    const product = await Product.create(req.body);
    res.status(201).json(sanitize(product));
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (req.body.categoryId) {
      const category = await Category.findById(req.body.categoryId);
      if (!category) return res.status(400).json({ message: "Category not found" });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-__v");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(sanitize(product));
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
