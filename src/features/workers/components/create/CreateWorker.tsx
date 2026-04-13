import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  IconButton, 
  Typography 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createWorkerSchema } from '../../schema/workerSchema';
import type { WorkerFormData } from '../../schema/workerSchema';
import useCreateWorker from '../../hooks/useCreateWorker';
import WorkerFields from './WorkerFields';
import v from '../../../../validations/validations';
import { useNotificationStore } from '../../../../stores/notificationStore';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateWorker({ open, onClose, onSuccess }: Props) {
  // Inicializamos el hook de creación
  const { createWorker, loading, serverErrors } = useCreateWorker(() => {
    reset(); // Limpiamos el formulario al tener éxito
    onSuccess(); // Refrescamos la lista y cerramos el modal
  });
  const { postNotification } = useNotificationStore();

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WorkerFormData>({
    resolver: zodResolver(createWorkerSchema) as any,
    defaultValues: {
      name: '',
      username: '',
      //TODO: El back devuelve email obligatorio y debe ser opcional
      email: '',
      dni: '',
      telefono: '',
      rol: '' as any,
      estado: 'activo',
      fecha_alta: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
      fecha_baja: null,
      password: '',
    } as WorkerFormData,
  });

  const onSubmit = async (data: WorkerFormData) => {
    try {
      await createWorker(data);
      postNotification("Trabajador creado con éxito", "success");
    } catch (error) {
      console.error("Error en el componente CreateWorker:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="md"
    >
      {/* Cabecera del Modal */}
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>
          {v.createForm.title.replace('{item}', v.entities.workers.singular)}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Cuerpo del Formulario */}
      <DialogContent dividers>
        <Box component="form" noValidate>
          <WorkerFields 
            register={register} 
            errors={errors} 
            control={control as any} 
            setValue={setValue}
            serverErrors={serverErrors}
          />
        </Box>
      </DialogContent>

      {/* Acciones */}
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleClose} 
          color="inherit" 
          disabled={loading}
        >
          {v.createForm.buttons.cancel}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit as any)}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Guardando...' : v.createForm.buttons.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
}