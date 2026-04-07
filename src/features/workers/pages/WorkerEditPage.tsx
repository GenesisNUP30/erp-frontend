import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditWorker from "../hooks/useEditWorker";
import WorkerEditForm from "../components/edit/WorkEditForm";
import WorkerEditHeader from "../components/edit/WorkerEditHeader";

export default function WorkerEditPage() {
  const { worker, loading, updating, error, serverErrors, updateWorker } = useEditWorker();
  const handleStatusUpdate = async (newStatus: string) => {
    // Lógica para llamar al service y actualizar la fecha_baja
    // Si es 'inactive', mandamos la fecha de hoy. Si es 'active', mandamos null.
    console.log("Cambiando estado a:", newStatus);
    // refresh();
  };
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !worker) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <WorkerEditHeader
          name={worker.name}
          isInactive={!!worker.fecha_baja}
          onStatusChange={handleStatusUpdate}
        />

        <WorkerEditForm
          initialData={worker}
          onSubmit={updateWorker}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
