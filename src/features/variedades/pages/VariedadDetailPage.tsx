import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useVariedadDetails from "../hooks/useVariedadDetails";
import VariedadDetailHeader from "../components/details/VariedadDetailHeader";
import VariedadDetailInfo from "../components/details/VariedadDetailInfo";
import v from "../../../validations/validations";

export default function VariedadDetailPage() {
  const { variedad, loading, error } = useVariedadDetails();
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
  if (error || !variedad)
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
        <VariedadDetailHeader
          variedadId={variedad.id}
          nombre={variedad.nombre}
          tipo={v.entities.variedades.tipos[variedad.tipo]}
        />
        <VariedadDetailInfo variedad={variedad} />
      </Stack>
    </Box>
  );
}
