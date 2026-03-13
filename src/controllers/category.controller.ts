import type { Request, Response } from "express";
import { Category } from "../models/category.model.js";

const sanitize = (doc: any) => {
  const { __v, _id, ...rest } = doc.toObject();
  return { id: _id, ...rest };
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().select("-__v");
    res.json(categories.map((c) => sanitize(c)));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id).select("-__v");
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(sanitize(category));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(sanitize(category));
  } catch (error) {
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-__v");
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(sanitize(category));
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
