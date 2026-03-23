import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import { MENU_ITEMS } from '../../routes/menuConfig';
import * as Icons from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
}

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 60;

export default function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const allowedMenuItems = MENU_ITEMS.filter(
    (item) => user?.rol && item.roles.includes(user.rol),
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar />
      <Divider />

      <List>
        {allowedMenuItems.map((item) => {
          const IconComponent =
            Icons[item.icon as keyof typeof Icons] ?? Icons.HelpOutline;

          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isActive}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: isActive ? 'primary.main' : 'inherit',
                  }}
                >
                  <IconComponent />
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}