import { z } from "zod";

const baseHorasSchema = z.object({
  user_id: z
    .number({ message: "El trabajador es obligatorio" })
    .min(1, "El trabajador es obligatorio"),
  cosecha_id: z.number().nullable().optional(),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  horas: z
    .number({ message: "Las horas son obligatorias" })
    .min(0.25, "Mínimo 0.25h")
    .max(24, "Máximo 24h"),
  precio_hora: z
    .number({ message: "El precio/hora es obligatorio" })
    .min(0, "No puede ser negativo"),
  tipo_trabajo: z.string().min(1, "El tipo de trabajo es obligatorio").max(100),
});

export const createHorasSchema = baseHorasSchema;
export const updateHorasSchema = baseHorasSchema;
export type HorasFormData = z.infer<typeof createHorasSchema>;
