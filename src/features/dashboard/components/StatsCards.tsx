import { Grid, Card, CardContent, Typography } from '@mui/material';
import type { StatItem } from '../types/IDashboard';

interface Props {
  stats: StatItem[];
}

export default function StatsCards({ stats }: Props) {
  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        // <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="body2">
                {stat.title}
              </Typography>
              <Typography variant="h5">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        // </Grid>
      ))}
    </Grid>
  );
}