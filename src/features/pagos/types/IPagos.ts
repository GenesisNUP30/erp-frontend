export type EstadoPago = "borrador" | "validado" | "pagado" | "archivado";

export interface Pago {
  id: number;
  user_id: number | null;
  mes: number;
  anio: number;
  total_horas: number;
  monto_total: number;
  estado: EstadoPago;
  fecha_pago: string | null;
  trabajador?: { id: number; name: string };
}

export interface CreatePagoDTO {
  user_id: number;
  mes: number;
  anio: number;
  total_horas: number;
  monto_total: number;
  estado: EstadoPago;
  fecha_pago?: string | null;
}

export interface UpdatePagoDTO extends Partial<CreatePagoDTO> {}

export interface BorradorPago {
  user_id: number;
  mes: number;
  anio: number;
  total_horas: number;
  monto_total: number;
  estado: "borrador";
}
