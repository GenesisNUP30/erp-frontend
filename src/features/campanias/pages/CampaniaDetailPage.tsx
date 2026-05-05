import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useCampaniaDetails from "../hooks/useCampaniaDetails";
import CampaniaDetailHeader from "../components/details/CampaniaDetailHeader";
import CampaniaDetailInfo from "../components/details/CampaniaDetailInfo";

export default function CampaniaDetailPage() {
  const { campania, loading, error } = useCampaniaDetails();
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
  if (error || !campania)
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
        <CampaniaDetailHeader
          campaniaId={campania.id}
          nombre={campania.nombre}
          estado={campania.estado}
        />
        <CampaniaDetailInfo campania={campania} />
      </Stack>
    </Box>
  );
}
