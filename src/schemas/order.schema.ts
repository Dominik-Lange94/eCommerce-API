import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    products: z
      .array(
        z.object({
          productId: z.string().min(1),
          quantity: z.number().int().positive(),
        })
      )
      .min(1),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    products: z
      .array(
        z.object({
          productId: z.string().min(1),
          quantity: z.number().int().positive(),
        })
      )
      .min(1)
      .optional(),
  }),
});
