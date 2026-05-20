import {
  Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Divider,
  Box, Typography, Avatar, Tooltip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import { MENU_ITEMS } from '../../routes/menuConfig';
import * as Icons from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
}

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const ROL_LABELS: Record<string, string> = {
  administrador: 'Administrador',
  encargado: 'Encargado',
  recolector: 'Recolector',
};

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

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
        transition: 'width 0.2s ease',
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar />

      {/* Lista de menú */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', pt: 1 }}>
        <List disablePadding>
          {allowedMenuItems.map((item) => {
            const IconComponent =
              Icons[item.icon as keyof typeof Icons] ?? Icons.HelpOutline;
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.path} disablePadding sx={{ display: 'block', px: 1, mb: 0.5 }}>
                <Tooltip title={!open ? item.title : ''} placement="right">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      minHeight: 44,
                      borderRadius: 2,
                      justifyContent: open ? 'initial' : 'center',
                      px: open ? 2 : 1.5,
                      bgcolor: isActive ? 'primary.main' : 'transparent',
                      color: isActive ? 'primary.contrastText' : 'text.secondary',
                      '&:hover': {
                        bgcolor: isActive ? 'primary.dark' : 'action.hover',
                        color: isActive ? 'primary.contrastText' : 'text.primary',
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1.5 : 'auto',
                        justifyContent: 'center',
                        color: 'inherit',
                      }}
                    >
                      <IconComponent fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400,
                        noWrap: true,
                      }}
                      sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.15s ease' }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Usuario al fondo */}
      {user && (
        <>
          <Divider />
          <Box
            sx={{
              p: open ? 2 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              justifyContent: open ? 'flex-start' : 'center',
              transition: 'padding 0.2s ease',
            }}
          >
            <Avatar
              sx={{
                width: 34, height: 34,
                bgcolor: 'primary.main',
                fontSize: '0.8rem',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {getInitials(user.name)}
            </Avatar>
            {open && (
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  noWrap
                  sx={{ lineHeight: 1.3 }}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ lineHeight: 1.2 }}
                >
                  {ROL_LABELS[user.rol] ?? user.rol}
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Drawer>
  );
}