
import { z } from "zod";
import { CATEGORIES_ENUM, SUBCATEGORIES_ENUM } from "../data";

export const ProductValidator = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(25, "Description must be at least 25 characters long"),
  price: z.number().min(0.1),
  category: z.enum(CATEGORIES_ENUM),
  subCategory: z.enum(SUBCATEGORIES_ENUM),
  images: z.preprocess((val: unknown) => val || [], z.array(z.string())),
  files: z.preprocess((val: unknown) => val || [], z.array(z.string())),
  discount: z.number().min(0).max(100).default(0),
  isFeatured: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ratings: z.array(
    z.object({
      userId: z.string(),
      rating: z.number().min(1).max(5),
    })
  ).default([]),
  averageRating: z.number().min(0).max(5).default(0),
});

export type TProductValidator = z.infer<typeof ProductValidator>;