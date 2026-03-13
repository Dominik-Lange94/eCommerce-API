import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    categoryId: z.string().min(1),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    categoryId: z.string().min(1).optional(),
  }),
});
