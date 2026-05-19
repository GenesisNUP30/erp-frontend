import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCosechaSchema } from '../../schema/cosechaSchema';
import type { CosechaFormData } from '../../schema/cosechaSchema';
import useCreateCosecha from '../../hooks/useCreateCosecha';
import CosechaFields from './CosechaFields';

interface Props { open: boolean; onClose: () => void; onSuccess: () => void; }

export default function CreateCosecha({ open, onClose, onSuccess }: Props) {
  const { createCosecha, loading, serverErrors } = useCreateCosecha(() => { reset(); onSuccess(); });
  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<CosechaFormData>({
    resolver: zodResolver(createCosechaSchema) as any,
    defaultValues: { nombre_cosecha: '', fecha_inicio: '', fecha_fin: null, estado: 'en_crecimiento', plantacion_id: 0, campania_id: 0 },
  });

  const onSubmit = async (data: CosechaFormData) => { try { await createCosecha(data); } catch {} };
  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Crear nueva cosecha</Typography>
        <IconButton onClick={handleClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <CosechaFields register={register} errors={errors} control={control as any} setValue={setValue} serverErrors={serverErrors} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={loading}>Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit as any)} variant="contained" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
