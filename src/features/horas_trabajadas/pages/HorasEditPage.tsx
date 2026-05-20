import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditHoras from "../hooks/useEditHoras";
import HorasEditHeader from "../components/edit/HorasEditHeader";
import HorasEditForm from "../components/edit/HorasEditForm";

export default function HorasEditPage() {
  const { horas, loading, updating, error, serverErrors, updateHoras } =
    useEditHoras();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !horas) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <HorasEditHeader
          fecha={horas.fecha}
          trabajador={horas.trabajador?.name ?? "---"}
        />
        <HorasEditForm
          initialData={horas}
          onSubmit={updateHoras}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
