import type { HorasFormData } from "../schema/horasTrabajadaSchema";
import type { CreateHorasTrabajadaDTO } from "../types/IHorasTrabajadas";

export const mapHorasFormToDTO = (
  data: HorasFormData,
): CreateHorasTrabajadaDTO => ({
  user_id: data.user_id,
  cosecha_id: data.cosecha_id ?? null,
  fecha: data.fecha,
  horas: data.horas,
  precio_hora: data.precio_hora,
  tipo_trabajo: data.tipo_trabajo,
});
