import type { StatusOption } from "../../../components/shared/StatusChip";


export const cosechaStatusOptions: StatusOption[] = [
  { label: 'En crecimiento', value: 'en_crecimiento', color: 'info' },
  { label: 'En recolección', value: 'en_recoleccion', color: 'success' },
  { label: 'En poda', value: 'en_poda', color: 'warning' },
  { label: 'Finalizada', value: 'finalizada', color: 'default' },
];
