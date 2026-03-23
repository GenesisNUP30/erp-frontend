// Cambia la importación a Grid2
import Grid from '@mui/material/Grid'; 
import { Card, CardContent, Typography } from '@mui/material';
import type { StatItem } from '../types/IDashboard';

interface Props {
  stats: StatItem[];
}

export default function StatsCards({ stats }: Props) {
  return (
    // Ya no necesitas 'container' e 'item' por separado
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        // Usamos el prop 'size' en lugar de xs, sm, md directamente
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
              <Typography variant="h5">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}