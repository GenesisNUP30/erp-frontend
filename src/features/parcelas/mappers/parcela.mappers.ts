import type { ParcelaFormData } from '../schema/parcelaSchema';
import type { CreateParcelaDTO, UpdateParcelaDTO } from '../types/IParcelas';

export const mapParcelaFormToCreateDTO = (data: ParcelaFormData): CreateParcelaDTO => ({
  nombre: data.nombre,
  superficie_hectareas: Number(data.superficie_hectareas),
  ubicacion: data.ubicacion,
  estado: data.estado,
});

export const mapParcelaFormToUpdateDTO = (data: ParcelaFormData): UpdateParcelaDTO =>
  mapParcelaFormToCreateDTO(data);