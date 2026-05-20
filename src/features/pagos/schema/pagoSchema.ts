import { z } from "zod";

const basePagoSchema = z.object({
  user_id: z
    .number({ message: "El trabajador es obligatorio" })
    .min(1, "El trabajador es obligatorio"),
  mes: z.number().min(1, "Mes inválido").max(12, "Mes inválido"),
  anio: z.number().min(2020, "Año inválido"),
  total_horas: z.number().min(0, "No puede ser negativo"),
  monto_total: z.number().min(0, "No puede ser negativo"),
  estado: z.enum(["borrador", "validado", "pagado", "archivado"]),
  fecha_pago: z.string().nullable().optional(),
});

export const createPagoSchema = basePagoSchema;
export const updatePagoSchema = basePagoSchema;
export type PagoFormData = z.infer<typeof createPagoSchema>;
