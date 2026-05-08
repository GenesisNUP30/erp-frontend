import { Box, CircularProgress, Alert, Stack } from "@mui/material";
import useEditVariedad from "../hooks/useEditVariedad";
import VariedadEditHeader from "../components/edit/VariedadEditHeader";
import VariedadEditForm from "../components/edit/VariedadEditForm";

export default function VariedadEditPage() {
  const { variedad, loading, updating, error, serverErrors, updateVariedad } =
    useEditVariedad();
  if (loading)
    return (
      <Box p={5} textAlign="center">
        <CircularProgress />
      </Box>
    );
  if (error || !variedad) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <VariedadEditHeader nombre={variedad.nombre} />
        <VariedadEditForm
          initialData={variedad}
          onSubmit={updateVariedad}
          loading={updating}
          serverErrors={serverErrors}
        />
      </Stack>
    </Box>
  );
}
