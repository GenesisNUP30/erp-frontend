export type TipoVariedad = 'remontante' | 'no_remontante';

export interface Variedad {
    id: number;
    nombre: string;
    tipo: TipoVariedad;
    descripcion: string | null;
    plantaciones_count?: number;
}

export interface CreateVariedadDTO {
    nombre: string;
    tipo: TipoVariedad;
    descripcion?: string | null;
}

export interface UpdateVariedadDTO extends Partial<CreateVariedadDTO> {}