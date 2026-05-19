import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import usePagoDetails from "../hooks/usePagoDetails";
import PagoDetailHeader from "../components/details/PagoDetailHeader";
import PagoDetailInfo from "../components/details/PagoDetailInfo";

export default function PagoDetailPage() {
  const { pago, loading, error } = usePagoDetails();
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
  if (error || !pago)
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
        <PagoDetailHeader
          pagoId={pago.id}
          mes={pago.mes}
          anio={pago.anio}
          estado={pago.estado}
          trabajador={pago.trabajador?.name ?? "---"}
        />
        <PagoDetailInfo pago={pago} />
      </Stack>
    </Box>
  );
}
