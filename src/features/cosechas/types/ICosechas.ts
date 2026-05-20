export type EstadoCosecha =
  | "en_crecimiento"
  | "en_recoleccion"
  | "en_poda"
  | "finalizada";

export interface Cosecha {
  id: number;
  plantacion_id: number;
  campania_id: number;
  nombre_cosecha: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  estado: EstadoCosecha;
  campania?: { id: number; nombre: string };
  plantacion?: {
    id: number;
    parcela?: { id: number; nombre: string };
    variedad?: { id: number; nombre: string };
  };
  recolecciones_count?: number;
}

export interface CreateCosechaDTO {
  plantacion_id: number;
  campania_id: number;
  nombre_cosecha: string;
  fecha_inicio: string;
  fecha_fin?: string | null;
  estado: EstadoCosecha;
}

export interface UpdateCosechaDTO extends Partial<CreateCosechaDTO> {}

export interface CosechaSelectOption {
  id: number;
  nombre_cosecha: string;
  campania_id: number;
  campania?: { id: number; nombre: string };
}
