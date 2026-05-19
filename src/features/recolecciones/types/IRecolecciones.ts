export type EstadoRecoleccion = "registrada" | "verificada" | "anulada";

export interface Recoleccion {
  id: number;
  cosecha_id: number;
  user_id: number | null;
  fecha: string;
  num_cajas: number;
  kilos_caja: number;
  notas: string | null;
  estado: EstadoRecoleccion;
  cosecha?: { id: number; nombre_cosecha: string };
  recolector?: { id: number; name: string };
}

export interface CreateRecoleccionDTO {
  cosecha_id: number;
  user_id?: number | null;
  fecha: string;
  num_cajas: number;
  kilos_caja: number;
  notas?: string | null;
  estado: EstadoRecoleccion;
}

export interface UpdateRecoleccionDTO extends Partial<CreateRecoleccionDTO> {}
