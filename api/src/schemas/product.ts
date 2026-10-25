import { z } from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(1, "Le titre est obligatoire"),
  description: z.string().trim().min(1, "La description est obligatoire"),
  price: z.number().finite().nonnegative(),
  thumbnail: z.string().url("L'image doit être une URL valide"),
  rating: z.number().min(0).max(5).optional(),
  categoryId: z.number().int().positive(),
});

export type ProductInput = z.infer<typeof productSchema>;