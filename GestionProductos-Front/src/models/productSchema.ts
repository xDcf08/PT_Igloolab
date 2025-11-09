import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  description: z.string().min(1, "Por favor agregar una descripción del producto"),
  price: z.number().positive("El precio no puede ser menor a $0")
})

export type CreateProductModel = z.infer<typeof ProductSchema>;