import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import BuildIcon from '@mui/icons-material/Build';
import type { StatusOption } from '../../../components/shared/StatusChip';
import v from '../../../validations/validations';

export const parcelaStatusOptions: StatusOption[] = [
  {
    label: v.entities.parcelas.status.activa,
    value: 'activa',
    color: 'success',
    icon: <CheckCircleIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.parcelas.status.inactiva,
    value: 'inactiva',
    color: 'error',
    icon: <RemoveCircleIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.parcelas.status.en_mantenimiento,
    value: 'en_mantenimiento',
    color: 'warning',
    icon: <BuildIcon sx={{ fontSize: '16px' }} />,
  },
];