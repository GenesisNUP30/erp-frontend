import { z } from "zod";

const estadoParcela = z.enum(['activa', 'inactiva', 'en_mantenimiento']);

const baseParcelaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(255),
  superficie_hectareas: z
    .string()
    .min(1, "La superficie es obligatoria")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "La superficie debe ser un número positivo",
    }),
  ubicacion: z.string().min(1, "La ubicación es obligatoria").max(255),
  estado: estadoParcela,
});

export const createParcelaSchema = baseParcelaSchema;
export const updateParcelaSchema = baseParcelaSchema;

export type ParcelaFormData = z.infer<typeof createParcelaSchema>;