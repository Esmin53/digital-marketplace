import { z } from "zod";

export const userValidator = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "admin"]).default("user"),
  favourites: z.array(z.string()).optional(),
  orders: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type UserType = z.infer<typeof userValidator>;