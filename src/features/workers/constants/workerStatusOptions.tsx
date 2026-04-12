import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import type { StatusOption } from '../../../components/shared/StatusChip';
import v from '../../../validations/validations';

export const workerStatusOptions: StatusOption[] = [
  {
    label: v.entities.workers.status.active,
    value: 'activo',
    color: 'success',
    icon: <CheckCircleIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.workers.status.inactive,
    value: 'inactivo',
    color: 'error',
    icon: <RemoveCircleIcon sx={{ fontSize: '16px' }} />,
  },
];