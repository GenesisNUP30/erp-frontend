import type { Role } from '../constants/roles';
import { ROUTES } from './routes';

export interface MenuItem {
  title: string;
  path: string;
  icon: string;
  roles: Role[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'Dashboard',
    roles: ['administrador', 'encargado', 'recolector'],
  },
  {
    title: 'Trabajadores',
    path: '/trabajadores',
    icon: 'People',
    roles: ['administrador', 'encargado'],
  },
  {
    title: 'Parcelas',
    path: '/parcelas',
    icon: 'LocationCity',
    roles: ['administrador', 'encargado', 'recolector'],
  },
];