import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import ScheduleIcon from '@mui/icons-material/Schedule';
import type { StatusOption } from '../../../components/shared/StatusChip';
import v from '../../../validations/validations';

export const plantacionStatusOptions: StatusOption[] = [
  {
    label: v.entities.plantaciones.status.activa,
    value: 'activa',
    color: 'success',
    icon: <CheckCircleIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.plantaciones.status.planificada,
    value: 'planificada',
    color: 'info',
    icon: <ScheduleIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.plantaciones.status.finalizada,
    value: 'finalizada',
    color: 'default',
    icon: <FlagIcon sx={{ fontSize: '16px' }} />,
  },
];