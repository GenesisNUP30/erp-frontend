import type { CosechaFormData } from "../schema/cosechaSchema";
import type { CreateCosechaDTO } from "../types/ICosechas";

export const mapCosechaFormToDTO = (
  data: CosechaFormData,
): CreateCosechaDTO => ({
  plantacion_id: data.plantacion_id,
  campania_id: data.campania_id,
  nombre_cosecha: data.nombre_cosecha,
  fecha_inicio: data.fecha_inicio,
  fecha_fin: data.fecha_fin || null,
  estado: data.estado,
});
