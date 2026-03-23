import { Box, Typography, CircularProgress } from "@mui/material";
import useWorkers from "../hooks/useWorkers";
import WorkersFilters from "../components/list/WorkersFilters";
import WorkersTable from "../components/list/WorkersTable";

export default function WorkersPage() {
  const { workers, search, setSearch, loading } = useWorkers();

  return (
    <Box p={3}>
      {/* TÍTULO (solo entidad) */}
      <Typography variant="h4" mb={2}>
        Trabajadores
      </Typography>

      {/* FILTROS */}
      <WorkersFilters search={search} onSearchChange={setSearch} />

      {/* CONTENIDO */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <WorkersTable workers={workers} />
      )}
    </Box>
  );
}
