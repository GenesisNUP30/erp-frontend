import type { Role } from '../../../constants/roles';

export interface Worker {
  id: number;
  name: string;
  username: string;
  rol: Role;
  fecha_alta: string;
  activo: boolean;
}