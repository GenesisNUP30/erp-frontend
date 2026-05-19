import type { PlantacionFormData } from '../schema/plantacionSchema';
import type { CreatePlantacionDTO, UpdatePlantacionDTO } from '../types/IPlantaciones';

export const mapPlantacionFormToCreateDTO = (data: PlantacionFormData): CreatePlantacionDTO => ({
  parcela_id: data.parcela_id,
  variedad_id: data.variedad_id,
  campania_id: data.campania_id,
  fecha_siembra: data.fecha_siembra,
  fecha_fin: data.estado === 'activa' ? null : data.fecha_fin || null,
  numero_plantas: data.numero_plantas,
  estado: data.estado,
});

export const mapPlantacionFormToUpdateDTO = (data: PlantacionFormData): UpdatePlantacionDTO =>
  mapPlantacionFormToCreateDTO(data);