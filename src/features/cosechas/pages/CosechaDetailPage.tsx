import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useCosechaDetails from "../hooks/useCosechaDetails";
import CosechaDetailHeader from "../components/details/CosechaDetailHeader";
import CosechaDetailInfo from "../components/details/CosechaDetailInfo";

export default function CosechaDetailPage() {
  const { cosecha, loading, error } = useCosechaDetails();
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
  if (error || !cosecha)
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
        <CosechaDetailHeader
          cosechaId={cosecha.id}
          nombre={cosecha.nombre_cosecha}
          estado={cosecha.estado}
        />
        <CosechaDetailInfo cosecha={cosecha} />
      </Stack>
    </Box>
  );
}
