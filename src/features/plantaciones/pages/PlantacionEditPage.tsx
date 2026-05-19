import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditPlantacion from "../hooks/useEditPlantacion";
import PlantacionEditHeader from "../components/edit/PlantacionEditHeader";
import PlantacionEditForm from "../components/edit/PlantacionEditForm";

export default function PlantacionEditPage() {
  const {
    plantacion,
    loading,
    updating,
    error,
    serverErrors,
    updatePlantacion,
  } = useEditPlantacion();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !plantacion) return <Alert severity="error">{error}</Alert>;

  const titulo = `${plantacion.parcela?.nombre} — ${plantacion.variedad?.nombre}`;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <PlantacionEditHeader titulo={titulo} estado={plantacion.estado} />
        <PlantacionEditForm
          initialData={plantacion}
          onSubmit={updatePlantacion}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
