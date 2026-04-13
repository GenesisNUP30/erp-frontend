import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditParcela from "../hooks/useEditParcela";
import ParcelaEditHeader from "../components/edit/ParcelaEditHeader";
import ParcelaEditForm from "../components/edit/ParcelaEditForm";

export default function ParcelaEditPage() {
  const { parcela, loading, updating, error, serverErrors, updateParcela } =
    useEditParcela();

  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !parcela) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <ParcelaEditHeader nombre={parcela.nombre} estado={parcela.estado} />
        <ParcelaEditForm
          initialData={parcela}
          onSubmit={updateParcela}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
