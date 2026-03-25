import { Box, Typography, CircularProgress } from "@mui/material";
import useWorkers from "../hooks/useWorkers";
import WorkersFilters from "../components/list/WorkersFilters";
import WorkersTable from "../components/list/WorkersTable";
import CreateWorker from "../components/create/CreateWorker";
import { useState } from "react";

export default function WorkersPage() {
  const { workers, search, setSearch, loading, refresh } = useWorkers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    handleCloseModal();
    if (refresh) refresh(); // Volvemos a pedir los trabajadores al backend
  };

  return (
    <Box p={3}>
      {/* TÍTULO (solo entidad) */}
      <Typography variant="h4" mb={2}>
        Trabajadores
      </Typography>

      {/* FILTROS */}
      <WorkersFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={handleOpenModal}
      />

      {/* CONTENIDO */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <WorkersTable workers={workers} />
      )}

      {/* MODAL DE CREACIÓN */}
      <CreateWorker
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </Box>
  );
}
