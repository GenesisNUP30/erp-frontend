import { z } from "zod";

const estadoCampania = z.enum(['activa', 'finalizada', 'planificada']);

const baseCampaniaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(255),
  fecha_inicio: z.string().min(1, "La fecha de inicio es obligatoria"),
  fecha_fin: z.string().nullable().optional(),
  descripcion: z.string().nullable().optional(),
  estado: estadoCampania,
}).refine((data) => {
  if ((data.estado === 'finalizada' || data.estado === 'planificada') && !data.fecha_fin) {
    return false;
  }
  return true;
}, {
  message: "La fecha de fin es obligatoria para campañas finalizadas o planificadas",
  path: ["fecha_fin"],
});

export const createCampaniaSchema = baseCampaniaSchema;
export const updateCampaniaSchema = baseCampaniaSchema;

export type CampaniaFormData = z.infer<typeof createCampaniaSchema>;