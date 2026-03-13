import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});
