export interface HorasTrabajada {
  id: number;
  user_id: number | null;
  cosecha_id: number | null;
  pago_id: number | null;
  fecha: string;
  horas: number;
  precio_hora: number;
  tipo_trabajo: string;
  trabajador?: { id: number; name: string };
  cosecha?: { id: number; nombre_cosecha: string };
  pago?: { id: number; mes: number; anio: number; estado: string };
}

export interface CreateHorasTrabajadaDTO {
  user_id: number;
  cosecha_id?: number | null;
  pago_id?: number | null;
  fecha: string;
  horas: number;
  precio_hora: number;
  tipo_trabajo: string;
}

export interface UpdateHorasTrabajadaDTO extends Partial<CreateHorasTrabajadaDTO> {}
