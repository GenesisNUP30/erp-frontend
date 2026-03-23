import WelcomeMessage from '../features/dashboard/components/WelcomeMessage';
import StatsCards from '../features/dashboard/components/StatsCards';
import QuickActions from '../features/dashboard/components/QuickActions';
import RecentActivity from '../features/dashboard/components/RecentActivity';
import useDashboardData from '../features/dashboard/hooks/useDashboardData';

import { Box } from '@mui/material';

export default function DashboardPage() {
  const { stats, activities } = useDashboardData();

  return (
    <Box sx={{ p: 3 }}>
      <WelcomeMessage />

      <StatsCards stats={stats} />

      <QuickActions />

      <RecentActivity activities={activities} />
    </Box>
  );
}