import type { VariedadFormData } from '../schema/variedadSchema';
import type { CreateVariedadDTO, UpdateVariedadDTO } from '../types/IVariedades';

export const mapVariedadFormToCreateDTO = (data: VariedadFormData): CreateVariedadDTO => ({
  nombre: data.nombre,
  tipo: data.tipo,
  descripcion: data.descripcion || null,
});

export const mapVariedadFormToUpdateDTO = (data: VariedadFormData): UpdateVariedadDTO =>
  mapVariedadFormToCreateDTO(data);