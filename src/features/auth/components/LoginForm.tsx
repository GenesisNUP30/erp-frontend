import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema';
import useLogin from '../hooks/useLogin';
import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Typography, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Login, LocalFlorist, Security } from '@mui/icons-material';

export default function LoginForm() {
  const { login } = useLogin();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '', remember: false },
  });

  const onSubmit = async (data: any) => {
    setLoginError(null);
    try {
      await login(data);
    } catch (error: any) {
      setLoginError(error?.message || 'Credenciales incorrectas o error de servidor');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 2,
    }}>
      <Box sx={{ width: '100%', maxWidth: 420 }}>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{
            width: 64, height: 64, borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            mb: 1.5,
          }}>
            <LocalFlorist sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Typography variant="h5" fontWeight={500}>ERP Agrícola</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Gestión de campo de frambuesa
          </Typography>
        </Box>

        {/* Card */}
        <Paper elevation={0} sx={{
          p: { xs: 2.5, sm: 3.5 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
              {loginError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email o usuario"
              fullWidth
              autoComplete="username"
              autoFocus
              margin="normal"
              inputProps={{ maxLength: 255 }}
              {...register('login')}
              error={!!errors.login}
              helperText={errors.login?.message as string}
              sx={{ mb: 1 }}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="current-password"
              margin="normal"
              inputProps={{ maxLength: 255 }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message as string}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />

            <FormControlLabel
              control={<Checkbox {...register('remember')} size="small" />}
              label={<Typography variant="body2" color="text.secondary">Recordar sesión</Typography>}
              sx={{ mb: 2.5, mt: 0.5 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              startIcon={<Login />}
              sx={{ py: 1.3, borderRadius: 2, fontSize: '1rem' }}
            >
              {isSubmitting ? 'Entrando...' : 'Iniciar sesión'}
            </Button>
          </Box>
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
          <Security sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography variant="caption" color="text.disabled">
            Acceso restringido — solo personal autorizado
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}