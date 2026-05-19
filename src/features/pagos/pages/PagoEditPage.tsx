import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditPago from "../hooks/useEditPago";
import PagoEditHeader from "../components/edit/PagoEditHeader";
import PagoEditForm from "../components/edit/PagoEditForm";

export default function PagoEditPage() {
  const { pago, loading, updating, error, serverErrors, updatePago } =
    useEditPago();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !pago) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <PagoEditHeader
          mes={pago.mes}
          anio={pago.anio}
          trabajador={pago.trabajador?.name ?? "---"}
        />
        <PagoEditForm
          initialData={pago}
          onSubmit={updatePago}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
