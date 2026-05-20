import { useState } from 'react';
import { useAuthStore } from '../../features/auth/store/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import {
  AppBar, Toolbar, Typography, IconButton, Box,
  Avatar, Chip, Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmDialog from '../shared/ConfirmDialog';

const ROL_LABELS: Record<string, string> = {
  administrador: 'Admin',
  encargado: 'Encargado',
  recolector: 'Recolector',
};

const ROL_COLORS: Record<string, 'success' | 'warning' | 'default'> = {
  administrador: 'success',
  encargado: 'warning',
  recolector: 'default',
};

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'primary.main',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 1.5, sm: 2.5 } }}>

          {/* IZQUIERDA */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" edge="start" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight={600} letterSpacing={0.3}>
              🌿 AgroBase
            </Typography>
          </Box>

          {/* DERECHA */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {user && (
              <>
                <Chip
                  label={ROL_LABELS[user.rol] ?? user.rol}
                  size="small"
                  color={ROL_COLORS[user.rol] ?? 'default'}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 22,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 32, height: 32,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ display: { xs: 'none', md: 'block' }, color: 'rgba(255,255,255,0.9)' }}
                  >
                    {user.name}
                  </Typography>
                </Box>
              </>
            )}

            <Tooltip title="Cerrar sesión">
              <IconButton
                color="inherit"
                onClick={() => setConfirmOpen(true)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <ConfirmDialog
        open={confirmOpen}
        title="¿Cerrar sesión?"
        description="Tu sesión se cerrará y tendrás que volver a iniciar sesión para acceder al sistema."
        confirmLabel="Cerrar sesión"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmLogout}
        onClose={() => setConfirmOpen(false)}
      />
    </>
  );
}