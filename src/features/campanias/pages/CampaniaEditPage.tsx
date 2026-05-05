import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditCampania from "../hooks/useEditCampania";
import CampaniaEditHeader from "../components/edit/CampaniaEditHeader";
import CampaniaEditForm from "../components/edit/CampaniaEditForm";

export default function CampaniaEditPage() {
  const { campania, loading, updating, error, serverErrors, updateCampania } =
    useEditCampania();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !campania) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <CampaniaEditHeader nombre={campania.nombre} estado={campania.estado} />
        <CampaniaEditForm
          initialData={campania}
          onSubmit={updateCampania}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
