import type { PagoFormData } from "../schema/pagoSchema";
import type { CreatePagoDTO } from "../types/IPagos";

export const mapPagoFormToDTO = (data: PagoFormData): CreatePagoDTO => ({
  user_id: data.user_id,
  mes: data.mes,
  anio: data.anio,
  total_horas: data.total_horas,
  monto_total: data.monto_total,
  estado: data.estado,
  fecha_pago: data.fecha_pago || null,
});
