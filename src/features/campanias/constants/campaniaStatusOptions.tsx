import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import ScheduleIcon from '@mui/icons-material/Schedule';
import type { StatusOption } from '../../../components/shared/StatusChip';
import v from '../../../validations/validations';

export const campaniaStatusOptions: StatusOption[] = [
  {
    label: v.entities.campanias.status.activa,
    value: 'activa',
    color: 'success',
    icon: <CheckCircleIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.campanias.status.finalizada,
    value: 'finalizada',
    color: 'warning',
    icon: <FlagIcon sx={{ fontSize: '16px' }} />,
  },
  {
    label: v.entities.campanias.status.planificada,
    value: 'planificada',
    color: 'info',
    icon: <ScheduleIcon sx={{ fontSize: '16px' }} />,
  },
];