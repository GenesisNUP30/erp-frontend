export interface Parcela {
  id: number;
  nombre: string;
  superficie_hectareas: string;
  ubicacion: string;
  estado: 'activa' | 'inactiva' | 'en_mantenimiento';
  plantaciones_count?: number;
}

export interface CreateParcelaDTO {
  nombre: string;
  superficie_hectareas: number;
  ubicacion: string;
  estado: 'activa' | 'inactiva' | 'en_mantenimiento';
}

export interface UpdateParcelaDTO extends Partial<CreateParcelaDTO> {}