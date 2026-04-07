import type { Role } from '../../../constants/roles';
import type { WorkerFormData } from '../schema/workerSchema';
import type { CreateWorkerDTO } from '../types/IWorkers';

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
});