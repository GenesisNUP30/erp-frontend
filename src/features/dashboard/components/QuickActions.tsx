import Grid from '@mui/material/Grid'; // Importación de la versión moderna
import { Button } from '@mui/material';

export default function QuickActions() {
  return (
    // Grid2 ya sabe manejar el espaciado de sus hijos directos
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Button variant="contained">
        Nueva Recolección
      </Button>

      <Button variant="outlined">
        Ver Parcelas
      </Button>
    </Grid>
  );
}