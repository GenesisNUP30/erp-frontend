import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '../../../../routes/routes';
import StatusChip from '../../../../components/shared/StatusChip';
import { campaniaStatusOptions } from '../../constants/campaniaStatusOptions';

interface Props { nombre: string; estado: string; }

export default function CampaniaEditHeader({ nombre, estado }: Props) {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={() => navigate(ROUTES.CAMPANIAS)} color="primary">
        <ArrowBackIcon />
      </IconButton>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{nombre}</Typography>
        <Box mt={0.5}>
          <StatusChip currentValue={estado} options={campaniaStatusOptions} canChange={false} />
        </Box>
      </Box>
    </Box>
  );
}