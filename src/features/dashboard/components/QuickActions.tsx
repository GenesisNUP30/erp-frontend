import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

export default function QuickActions() {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Button variant="contained">Nueva Recolección</Button>

      <Button variant="outlined">Ver Parcelas</Button>
    </Grid>
  );
}
