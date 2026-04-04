import { Box, Typography, CircularProgress } from "@mui/material";
import useWorkers from "../hooks/useWorkers";
import { useNavigate } from "react-router-dom"; 
import { ROUTES } from "../../../routes/routes";
import WorkersFilters from "../components/list/WorkersFilters";
import WorkersTable from "../components/list/WorkersTable";
import CreateWorker from "../components/create/CreateWorker";
import { useState } from "react";
import type { Worker } from "../types/IWorkers";

export default function WorkersPage() {
  const navigate = useNavigate();
  const { workers, search, setSearch, loading, refresh } = useWorkers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Lógica para ir al detalle 
  const handleViewDetails = (worker: Worker) => {
    const path = ROUTES.WORKER_DETAILS.replace(':id', worker.id.toString());
    navigate(path);
  };

  // Lógica para ir a editar 
  const handleEditWorker = (worker: Worker) => {
    // Por ahora lo dejamos apuntando al detalle o donde prefieras
    console.log("Editando trabajador:", worker.id);
  };

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
        <WorkersTable 
        workers={workers} 
        loading={loading} 
        onViewDetails={handleViewDetails} 
        onEditWorker={handleEditWorker} 
        />
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
