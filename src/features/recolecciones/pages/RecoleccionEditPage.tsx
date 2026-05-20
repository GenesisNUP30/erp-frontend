import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditRecoleccion from "../hooks/useEditRecoleccion";
import RecoleccionEditHeader from "../components/edit/RecoleccionEditHeader";
import RecoleccionEditForm from "../components/edit/RecoleccionEditForm";

export default function RecoleccionEditPage() {
  const {
    recoleccion,
    loading,
    updating,
    error,
    serverErrors,
    updateRecoleccion,
  } = useEditRecoleccion();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !recoleccion) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <RecoleccionEditHeader
          fecha={recoleccion.fecha}
          estado={recoleccion.estado}
        />
        <RecoleccionEditForm
          initialData={recoleccion}
          onSubmit={updateRecoleccion}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
