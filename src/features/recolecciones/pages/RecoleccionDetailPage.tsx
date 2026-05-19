import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useRecoleccionDetails from "../hooks/useRecoleccionDetails";
import RecoleccionDetailHeader from "../components/details/RecoleccionDetailHeader";
import RecoleccionDetailInfo from "../components/details/RecoleccionDetailInfo";

export default function RecoleccionDetailPage() {
  const { recoleccion, loading, error } = useRecoleccionDetails();
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
  if (error || !recoleccion)
    return (
      <Box p={3}>
        <Alert severity="error">
          {error || "No se pudo cargar la información"}
        </Alert>
      </Box>
    );

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <RecoleccionDetailHeader
          recoleccionId={recoleccion.id}
          fecha={recoleccion.fecha}
          estado={recoleccion.estado}
        />
        <RecoleccionDetailInfo recoleccion={recoleccion} />
      </Stack>
    </Box>
  );
}
