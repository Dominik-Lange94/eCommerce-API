import type { Request, Response } from "express";
import { User } from "../models/user.model.js";

const sanitize = (user: any) => {
  const { password, __v, _id, ...rest } = user.toObject();
  return { id: _id, ...rest };
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password -__v");
    res.json(users.map((u) => sanitize(u)));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(sanitize(user));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(sanitize(user));
  } catch (error) {
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(sanitize(user));
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};
