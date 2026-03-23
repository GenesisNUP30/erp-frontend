import { Grid, Button } from '@mui/material';

export default function QuickActions() {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {/* <Grid item> */}
        <Button variant="contained">
          Nueva Recolección
        </Button>
      {/* </Grid> */}

      {/* <Grid item> */}
        <Button variant="outlined">
          Ver Parcelas
        </Button>
      </Grid>
    // </Grid>
  );
}