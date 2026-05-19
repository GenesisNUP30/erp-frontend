import { z } from "zod";

const estadoPlantacion = z.enum(['planificada', 'activa', 'finalizada']);

const basePlantacionSchema = z.object({
  parcela_id: z.number({ message: "La parcela es obligatoria" }).min(1),
  variedad_id: z.number({ message: "La variedad es obligatoria" }).min(1),
  campania_id: z.number({ message: "La campaña es obligatoria" }).min(1),
  fecha_siembra: z.string().min(1, "La fecha de siembra es obligatoria"),
  fecha_fin: z.string().nullable().optional(),
  numero_plantas: z.number({ message: "El número de plantas es obligatorio" }).min(1, "Debe haber al menos 1 planta"),
  estado: estadoPlantacion,
}).refine((data) => {
  if ((data.estado === 'planificada' || data.estado === 'finalizada') && !data.fecha_fin) {
    return false;
  }
  return true;
}, {
  message: "La fecha de finalización es obligatoria para plantaciones planificadas o finalizadas",
  path: ["fecha_fin"],
});

export const createPlantacionSchema = basePlantacionSchema;
export const updatePlantacionSchema = basePlantacionSchema;

export type PlantacionFormData = z.infer<typeof createPlantacionSchema>;