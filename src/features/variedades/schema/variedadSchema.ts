import { z } from 'zod';

const tipoVariedad = z.enum(['remontante', 'no_remontante']);

export const baseVariedadSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(255),
  tipo: tipoVariedad,
  descripcion: z.string().nullable().optional(),
});

export const createVariedadSchema = baseVariedadSchema;
export const updateVariedadSchema = baseVariedadSchema;

export type VariedadFormData = z.infer<typeof createVariedadSchema>;