import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres.")
    .refine(val => val.trim().length > 0, "El nombre es obligatorio."),
  
  description: z.string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .refine(val => val.trim().length > 0, "La descripción es obligatoria."),
  
  price: z.number()
    .refine(val => typeof val === 'number' && !isNaN(val), "El precio debe ser un número.")
    .positive("El precio debe ser un número positivo."),
}).strict();

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
