import type { Role } from '../../../constants/roles';

export interface Worker {
  id: number;
  name: string;
  username: string;
  dni: string;
  telefono: string;
  rol: Role;
  fecha_alta: string;
  fecha_baja: string | null;
  activo: boolean;
}