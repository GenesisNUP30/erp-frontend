import { List, ListItem, ListItemText, Typography } from '@mui/material';
import type { ActivityItem } from '../types/IDashboard';

interface Props {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: Props) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Actividad reciente
      </Typography>

      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText
              primary={activity.description}
              secondary={activity.date}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}