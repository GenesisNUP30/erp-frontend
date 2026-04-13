import { Box, Button, Typography } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
// eslint-disable-next-line react-refresh/only-export-components
export const toastItem = (
  msg: string,
  type: 'success' | 'error' = 'success',
  action?: { label: string; callback: () => void },
) => {
  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle : ErrorOutline;

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.5,
        minWidth: 280,
        maxWidth: 420,

        borderRadius: 2,

        backgroundColor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: 'blur(8px)',

        border: `1px solid ${
          isSuccess ? alpha(theme.palette.success.main, 0.4) : alpha(theme.palette.error.main, 0.4)
        }`,

        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',

        color: '#fff',
      })}
    >
      <Icon
        sx={(theme) => ({
          fontSize: 20,
          color: isSuccess ? theme.palette.success.main : theme.palette.error.main,
        })}
      />

      <Typography variant="body2" sx={{ flexGrow: 1, lineHeight: 1.4 }}>
        {msg}
      </Typography>

      {action && (
        <Button
          size="small"
          onClick={action.callback}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: 'primary.main',
            minWidth: 'auto',
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};

const NotificationsComponent = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 3000,
      style: {
        background: 'transparent',
        boxShadow: 'none',
      },
    }}
  />
);

export default NotificationsComponent;