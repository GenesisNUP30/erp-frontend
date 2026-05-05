export type EstadoCampania = 'activa' | 'finalizada' | 'planificada';

export interface Campania {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  descripcion: string | null;
  estado: EstadoCampania;
}

export interface CreateCampaniaDTO {
  nombre: string;
  fecha_inicio: string;
  fecha_fin?: string | null;
  descripcion?: string | null;
  estado: EstadoCampania;
}

export interface UpdateCampaniaDTO extends Partial<CreateCampaniaDTO> {}