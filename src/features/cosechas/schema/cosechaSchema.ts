import { z } from "zod";

const baseCosechaSchema = z.object({
  plantacion_id: z
    .number({ message: "La plantación es obligatoria" })
    .min(1, "La plantación es obligatoria"),
  campania_id: z
    .number({ message: "La campaña es obligatoria" })
    .min(1, "La campaña es obligatoria"),
  nombre_cosecha: z.string().min(1, "El nombre es obligatorio").max(255),
  fecha_inicio: z.string().min(1, "La fecha de inicio es obligatoria"),
  fecha_fin: z.string().nullable().optional(),
  estado: z.enum(["en_crecimiento", "en_recoleccion", "en_poda", "finalizada"]),
});

export const createCosechaSchema = baseCosechaSchema;
export const updateCosechaSchema = baseCosechaSchema;
export type CosechaFormData = z.infer<typeof createCosechaSchema>;
