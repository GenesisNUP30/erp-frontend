import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { StatItem } from '../types/IDashboard';
import GrassIcon from '@mui/icons-material/Grass';
import EuroIcon from '@mui/icons-material/Euro';
import PeopleIcon from '@mui/icons-material/People';
import ScaleIcon from '@mui/icons-material/Scale';
import Inventory2Icon from '@mui/icons-material/Inventory2';

// Mapa de icono y color por clave de stat
const STAT_CONFIG: Record<string, { icon: React.ReactNode; color: string; suffix?: string }> = {
  kilos_hoy:        { icon: <ScaleIcon />,     color: '#2e7d32', suffix: ' kg' },
  mis_kilos:        { icon: <ScaleIcon />,     color: '#2e7d32', suffix: ' kg' },
  ventas_hoy:       { icon: <EuroIcon />,      color: '#1565c0', suffix: ' €' },
  usuarios_activos: { icon: <PeopleIcon />,    color: '#6a1b9a' },
  mis_cajas:        { icon: <Inventory2Icon />,color: '#e65100', suffix: ' cajas' },
};

interface Props {
  stats: StatItem[];
}

export default function StatsCards({ stats }: Props) {
  if (!stats || stats.length === 0) return null;

  return (
    <Grid container spacing={2} mt={0.5}>
      {stats.map((stat, index) => {
        const config = STAT_CONFIG[stat.key ?? ''] ?? { icon: <GrassIcon />, color: '#2e7d32' };

        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {stat.title}
                  </Typography>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: 2,
                    bgcolor: `${config.color}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: config.color,
                    '& svg': { fontSize: 20 }
                  }}>
                    {config.icon}
                  </Box>
                </Box>
                <Typography variant="h5" fontWeight={600} color={config.color}>
                  {stat.value}{config.suffix ?? ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}