import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(3, { message: "minimum 3 letters required" }),
  price: z.string().regex(new RegExp(/^\d*\.\d+$|^\d+$/)),
  image: z.string(),
  unit: z.string().min(3, {message: "minimum 3 letters required"}),
  description: z.string().min(3, {message: "minimum 3 letters required"}),
  categoryId: z.object({
    id: z.string().regex(new RegExp(/^\d*\.\d+$|^\d+$/)),
    name: z.string(),
  }),
  subCategoryId: z.object({
    id: z.string().regex(new RegExp(/^\d*\.\d+$|^\d+$/)),
    name: z.string(),
  }),
});

export type ProductInput = z.infer<typeof ProductFormSchema>;
