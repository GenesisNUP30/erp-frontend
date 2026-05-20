import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useHorasDetails from "../hooks/useHorasDetails";
import HorasDetailHeader from "../components/details/HorasDetailHeader";
import HorasDetailInfo from "../components/details/HorasDetailInfo";

export default function HorasDetailPage() {
  const { horas, loading, error } = useHorasDetails();
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
  if (error || !horas)
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
        <HorasDetailHeader
          horasId={horas.id}
          fecha={horas.fecha}
          trabajador={horas.trabajador?.name ?? "---"}
        />
        <HorasDetailInfo horas={horas} />
      </Stack>
    </Box>
  );
}
