import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useParcelaDetails from "../hooks/useParcelaDetails";
import ParcelaDetailHeader from "../components/details/ParcelaDetailHeader";
import ParcelaDetailInfo from "../components/details/ParcelaDetailInfo";

export default function ParcelaDetailPage() {
  const { parcela, loading, error } = useParcelaDetails();

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
  if (error || !parcela)
    return (
      <Box p={3}>
        <Alert severity="error">
          {error || "No se ha podido cargar la información"}
        </Alert>
      </Box>
    );

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <ParcelaDetailHeader
          parcelaId={parcela.id}
          nombre={parcela.nombre}
          estado={parcela.estado}
        />
        <ParcelaDetailInfo parcela={parcela} />
      </Stack>
    </Box>
  );
}
