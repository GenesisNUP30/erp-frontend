import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WorkerFields from "../create/WorkerFields"; // Reutilizamos tus inputs
import type { Worker } from "../../types/IWorkers";
import { updateWorkerSchema } from "../../schema/workerSchema";
import { z } from "zod";

type WorkerFormData = z.infer<typeof updateWorkerSchema>;

interface Props {
  initialData: Worker;
  onSubmit: (data: any) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function WorkerEditForm({ initialData, onSubmit, loading, serverErrors }: Props) {
  const { control, handleSubmit, register, formState: { errors } } = useForm<WorkerFormData>({
    resolver: zodResolver(updateWorkerSchema) as any,
    defaultValues: {
      name: initialData.name,
      username: initialData.username,
      email: initialData.email ?? undefined,
      dni: initialData.dni,
      telefono: initialData.telefono,
      rol: initialData.rol,
      fecha_alta: initialData.fecha_alta,
      password: "", 
    } as WorkerFormData, // Rellenamos el formulario con los datos actuales
  });

  return (
    <Paper sx={{ p: 3, borderRadius: '12px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Usamos tus campos ya definidos */}
        <WorkerFields control={control as any} errors={errors} register={register} serverErrors={serverErrors}/>
        
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}