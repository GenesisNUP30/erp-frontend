export type EstadoPlantacion = 'planificada' | 'activa' | 'finalizada';

export interface Plantacion {
  id: number;
  parcela_id: number;
  variedad_id: number;
  campania_id: number;
  parcela?: { id: number; nombre: string };
  variedad?: { id: number; nombre: string };
  campania?: { id: number; nombre: string };
  fecha_siembra: string;
  fecha_fin: string | null;
  numero_plantas: number;
  estado: EstadoPlantacion;
  cosechas_count?: number;
}

export interface CreatePlantacionDTO {
  parcela_id: number;
  variedad_id: number;
  campania_id: number;
  fecha_siembra: string;
  fecha_fin?: string | null;
  numero_plantas: number;
  estado: EstadoPlantacion;
}

export interface UpdatePlantacionDTO extends Partial<CreatePlantacionDTO> {}

// Para los selects
export interface SelectOption {
  id: number;
  nombre: string;
}