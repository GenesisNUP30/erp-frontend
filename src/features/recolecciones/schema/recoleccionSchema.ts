import { z } from "zod";

const baseRecoleccionSchema = z.object({
  cosecha_id: z
    .number({ message: "La cosecha es obligatoria" })
    .min(1, "La cosecha es obligatoria"),
  user_id: z
    .number({ message: "El recolector es obligatorio" })
    .min(1, "El recolector es obligatorio"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
  num_cajas: z
    .number({ message: "El nº de cajas es obligatorio" })
    .min(1, "Mínimo 1 caja"),
  kilos_caja: z
    .number({ message: "Los kilos por caja son obligatorios" })
    .min(0.01, "Debe ser mayor a 0"),
  notas: z.string().nullable().optional(),
  estado: z.enum(["registrada", "verificada", "anulada"]),
});

export const createRecoleccionSchema = baseRecoleccionSchema;
export const updateRecoleccionSchema = baseRecoleccionSchema;
export type RecoleccionFormData = z.infer<typeof createRecoleccionSchema>;
