import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { ROUTES } from '../../../../routes/routes';
import StatusChip, { type StatusOption } from '../../../../components/shared/StatusChip';

interface Props {
  workerId: number;
  name: string;
  isInactive: boolean;
  onStatusChange: (status: string) => void;
}

export default function WorkerDetailHeader({ workerId, name, isInactive, onStatusChange }: Props) {
  const navigate = useNavigate();

  // Configuración de estados 
  const statusOptions: StatusOption[] = [
    { label: 'Activo', value: 'active', color: 'success' },
    { label: 'Inactivo', value: 'inactive', color: 'default' },
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

      {/* LADO DERECHO: Acciones rápidas */}
      <Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(ROUTES.WORKER_DETAILS.replace(':id', workerId.toString()) + '/editar')}
        >
          Editar Trabajador
        </Button>
      </Box>
    </Box>
  );
}