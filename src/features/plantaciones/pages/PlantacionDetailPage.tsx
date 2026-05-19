import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import usePlantacionDetails from "../hooks/usePlantacionDetails";
import PlantacionDetailHeader from "../components/details/PlantacionDetailHeader";
import PlantacionDetailInfo from "../components/details/PlantacionDetailInfo";

export default function PlantacionDetailPage() {
  const { plantacion, loading, error } = usePlantacionDetails();
  if (loading)
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
  if (error || !plantacion)
    return (
      <Box p={3}>
        <Alert severity="error">
          {error || "No se ha podido cargar la información"}
        </Alert>
      </Box>
    );

  const titulo = `${plantacion.parcela?.nombre} — ${plantacion.variedad?.nombre}`;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <PlantacionDetailHeader
          plantacionId={plantacion.id}
          titulo={titulo}
          estado={plantacion.estado}
        />
        <PlantacionDetailInfo plantacion={plantacion} />
      </Stack>
    </Box>
  );
}
