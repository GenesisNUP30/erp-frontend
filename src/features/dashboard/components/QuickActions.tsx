import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/authStore';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { ROUTES } from '../../../routes/routes';

export default function QuickActions() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const isAdmin = user.rol === 'administrador';
  const isEncargado = user.rol === 'encargado';
  const isRecolector = user.rol === 'recolector';

  return (
    <Box mt={3}>
      <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
        Accesos rápidos
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1.5}>

        {/* Admin y encargado */}
        {(isAdmin || isEncargado) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(ROUTES.RECOLECCIONES)}
          >
            Nueva recolección
          </Button>
        )}

        {(isAdmin || isEncargado) && (
          <Button
            variant="outlined"
            startIcon={<AgricultureIcon />}
            onClick={() => navigate(ROUTES.COSECHAS)}
          >
            Ver cosechas
          </Button>
        )}

        {(isAdmin || isEncargado) && (
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => navigate(ROUTES.PARCELAS)}
          >
            Ver parcelas
          </Button>
        )}

        {isAdmin && (
          <Button
            variant="outlined"
            startIcon={<PaymentsIcon />}
            onClick={() => navigate(ROUTES.PAGOS)}
          >
            Gestionar pagos
          </Button>
        )}

        {/* Recolector */}
        {isRecolector && (
          <Button
            variant="outlined"
            startIcon={<AccessTimeIcon />}
            onClick={() => navigate(ROUTES.HORAS_TRABAJADAS)}
          >
            Mis horas
          </Button>
        )}

        {isRecolector && (
          <Button
            variant="outlined"
            startIcon={<PaymentsIcon />}
            onClick={() => navigate(ROUTES.PAGOS)}
          >
            Mis pagos
          </Button>
        )}

      </Box>
    </Box>
  );
}