import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WorkerFields from "../create/WorkerFields"; // Reutilizamos tus inputs
import type { Worker } from "../../types/IWorkers";
import { updateWorkerSchema } from "../../schema/workerSchema";
import { useAuthStore } from "../../../auth/store/authStore";
import { z } from "zod";

type WorkerFormData = z.infer<typeof updateWorkerSchema>;

interface Props {
  initialData: Worker;
  onSubmit: (data: any) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function WorkerEditForm({ initialData, onSubmit, loading, serverErrors }: Props) {

  // Obtener el usuario logueado desde Zustand
  const currentUser = useAuthStore((state) => state.user);

  // Solo el administrador puede editar el rol
  const canEditRol = currentUser?.rol === "administrador";

  const { control, handleSubmit, register, setValue, formState: { errors, isDirty } } = useForm<WorkerFormData>({
    resolver: zodResolver(updateWorkerSchema) as any,
    defaultValues: {
      name: initialData.name,
      //TODO: Si no relleno usuario me saler error: Invalid input: expected string, received null. Si le doy una segunda vez al boton si funciona
      username: initialData.username,
      email: initialData.email ?? undefined,
      dni: initialData.dni,
      telefono: initialData.telefono,
      rol: initialData.rol,
      estado: initialData.estado || 'activo',
      fecha_alta: initialData.fecha_alta,
      fecha_baja: initialData.fecha_baja,
      password: "", 
    } as WorkerFormData, // Rellenamos el formulario con los datos actuales
  });

  return (
    <Paper sx={{ p: 3, borderRadius: '12px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Usar campos ya definidos */}
        <WorkerFields control={control as any} errors={errors} register={register} setValue={setValue} serverErrors={serverErrors} canEditRol={canEditRol}/>
        
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" type="submit" disabled={loading || !isDirty}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}