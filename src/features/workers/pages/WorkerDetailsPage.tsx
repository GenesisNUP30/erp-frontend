import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useWorkerDetails from "../hooks/useWorkerDetails";
import WorkerDetailHeader from "../components/details/WorkerDetailHeader";
import WorkerDetailInfo from "../components/details/WorkerDetailInfo";

export default function WorkerDetailsPage() {
  const { worker, loading, error } = useWorkerDetails();
  // Dentro de WorkerDetailsPage.tsx
  const handleStatusUpdate = async (newStatus: string) => {
    // Lógica para llamar al service y actualizar la fecha_baja
    // Si es 'inactive', mandamos la fecha de hoy. Si es 'active', mandamos null.
    console.log("Cambiando estado a:", newStatus);
    // refresh();
  };
  // Gestión de estados de carga y error (Fuera del flujo principal)
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !worker) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {error || "No se ha podido cargar la información"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {/* Componente de cabecera con botón volver y título */}
        <WorkerDetailHeader
          workerId={worker.id}
          name={worker.name}
          isInactive={!!worker.fecha_baja}
          onStatusChange={handleStatusUpdate}
        />

        {/* Componente con la información detallada */}
        <WorkerDetailInfo worker={worker} />

        {/* Aquí podrías añadir un WorkerStatusCard o similares en el futuro */}
      </Stack>
    </Box>
  );
}
