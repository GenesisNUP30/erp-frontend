import type { Role } from '../../../constants/roles';

/**
 * Modelo que usa las tablas
 */
export interface Worker {
  id: number;
  name: string;
  username: string;
  dni: string;
  telefono: string;
  rol: Role;
  fecha_alta: string;
  fecha_baja: string | null;
}

/**
 * DTO para crear trabajador
 */
export interface CreateWorkerDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  dni: string;
  telefono: string;
  rol: Role;
  fecha_alta: string;
}

/**
 * DTO para actualizar trabajador
 */
export interface UpdateWorkerDTO {
  name?: string;
  username?: string;
  email?: string | null;
  password?: string;
  dni?: string;
  telefono?: string;
  rol?: Role;
  fecha_alta?: string;
  fecha_baja?: string | null;
}