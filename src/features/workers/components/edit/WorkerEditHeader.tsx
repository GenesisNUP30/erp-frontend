import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '../../../../routes/routes';
import StatusChip, { type StatusOption } from '../../../../components/shared/StatusChip';
import v from '../../../../validations/validations';

interface Props {
  name: string;
  isInactive: boolean;
  onStatusChange: (status: string) => void;
}

export default function WorkerEditHeader({name, isInactive, onStatusChange }: Props) {
    const navigate = useNavigate();

    // Configuración de estados 
    const statusOptions: StatusOption[] = [
      { label: v.entities.workers.status.active, value: 'active', color: 'success' },
      { label: v.entities.workers.status.inactive, value: 'inactive', color: 'default' },
    ];

    const currentStatusValue = isInactive ? 'inactive' : 'active';

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      {/* LADO IZQUIERDO: Volver + Nombre */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={() => navigate(ROUTES.WORKERS)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{name}</Typography>
          <Box mt={0.5}>
            <StatusChip 
              currentValue={currentStatusValue}
              options={statusOptions}
              canChange={true}
              onStatusChange={onStatusChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
    );
}
