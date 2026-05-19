import type { RecoleccionFormData } from "../schema/recoleccionSchema";
import type { CreateRecoleccionDTO } from "../types/IRecolecciones";

export const mapRecoleccionFormToDTO = (
  data: RecoleccionFormData,
): CreateRecoleccionDTO => ({
  cosecha_id: data.cosecha_id,
  user_id: data.user_id ?? null,
  fecha: data.fecha,
  num_cajas: data.num_cajas,
  kilos_caja: data.kilos_caja,
  notas: data.notas || null,
  estado: data.estado,
});
