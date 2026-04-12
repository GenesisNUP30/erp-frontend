import type { Role } from '../../../constants/roles';
import type { WorkerFormData } from '../schema/workerSchema';
import type { CreateWorkerDTO, UpdateWorkerDTO } from '../types/IWorkers';

/**
 * Mapea datos del formulario → DTO del backend
 */
export const mapWorkerFormToCreateDTO = (
  data: WorkerFormData,
): CreateWorkerDTO => ({
  name: data.name,
  username: data.username ?? '',
  email: data.email || '',
  password: data.password || '',
  dni: data.dni,
  telefono: data.telefono,
  rol: data.rol as Role,
  fecha_alta: data.fecha_alta,
  estado: data.estado,
});

export const mapWorkerFormToUpdateDTO = (data: WorkerFormData): UpdateWorkerDTO => ({
  ...mapWorkerFormToCreateDTO(data),
  fecha_baja: data.estado === 'activo' ? null : data.fecha_baja,
});