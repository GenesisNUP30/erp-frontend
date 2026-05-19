import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditCosecha from "../hooks/useEditCosecha";
import CosechaEditHeader from "../components/edit/CosechaEditHeader";
import CosechaEditForm from "../components/edit/CosechaEditForm";

export default function CosechaEditPage() {
  const { cosecha, loading, updating, error, serverErrors, updateCosecha } =
    useEditCosecha();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !cosecha) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <CosechaEditHeader
          nombre={cosecha.nombre_cosecha}
          estado={cosecha.estado}
        />
        <CosechaEditForm
          initialData={cosecha}
          onSubmit={updateCosecha}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
