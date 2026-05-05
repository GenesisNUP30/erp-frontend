import type { CampaniaFormData } from '../schema/campaniaSchema';
import type { CreateCampaniaDTO, UpdateCampaniaDTO } from '../types/ICampanias';

export const mapCampaniaFormToCreateDTO = (data: CampaniaFormData): CreateCampaniaDTO => ({
  nombre: data.nombre,
  fecha_inicio: data.fecha_inicio,
  fecha_fin: data.estado === 'activa' ? null : data.fecha_fin || null,
  descripcion: data.descripcion || null,
  estado: data.estado,
});

export const mapCampaniaFormToUpdateDTO = (data: CampaniaFormData): UpdateCampaniaDTO =>
  mapCampaniaFormToCreateDTO(data);