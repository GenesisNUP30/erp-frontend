import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createParcelaSchema } from '../../schema/parcelaSchema';
import type { ParcelaFormData } from '../../schema/parcelaSchema';
import useCreateParcela from '../../hooks/useCreateParcela';
import ParcelaFields from './ParcelaFields';
import v from '../../../../validations/validations';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateParcela({ open, onClose, onSuccess }: Props) {
  const { createParcela, loading, serverErrors } = useCreateParcela(() => {
    reset();
    onSuccess();
  });

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ParcelaFormData>({
    resolver: zodResolver(createParcelaSchema) as any,
    defaultValues: {
      nombre: '',
      superficie_hectareas: '',
      ubicacion: '',
      estado: 'activa',
    } as any,
  });

  const onSubmit = async (data: ParcelaFormData) => {
    try {
      await createParcela(data);
    } catch (error) {
      console.error("Error en CreateParcela:", error);
    }
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>{v.createForm.title.replace('{item}', v.entities.parcelas.singular)}</Typography>
        <IconButton onClick={handleClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <ParcelaFields register={register} errors={errors} control={control as any} serverErrors={serverErrors} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={loading}>{v.createForm.buttons.cancel}</Button>
        <Button onClick={handleSubmit(onSubmit as any)} variant="contained" disabled={loading}>
          {loading ? 'Guardando...' : v.createForm.buttons.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
}