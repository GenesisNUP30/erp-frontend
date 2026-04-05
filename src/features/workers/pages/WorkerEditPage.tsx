import { Box, CircularProgress, Alert, Typography } from "@mui/material";
import useEditWorker from "../hooks/useEditWorker";
import WorkerEditForm from "../components/edit/WorkEditForm";


export default function WorkerEditPage() {
  const { worker, loading, updating, error, updateWorker } = useEditWorker();

  if (loading) return <Box p={5} textAlign="center"><CircularProgress /></Box>;
  if (error || !worker) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Editar Trabajador: {worker.name}</Typography>
      
      <Box maxWidth="800px">
        <WorkerEditForm 
          initialData={worker} 
          onSubmit={updateWorker} 
          loading={updating} 
        />
      </Box>
    </Box>
  );
}