import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import useWorkers from "../hooks/useWorkers";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import WorkersFilters from "../components/list/WorkersFilters";
import WorkersTable from "../components/list/WorkersTable";
import CreateWorker from "../components/create/CreateWorker";
import useDeleteWorker from "../hooks/useDeleteWorker";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import { useState } from "react";
import type { Worker } from "../types/IWorkers";

export default function WorkersPage() {
  const navigate = useNavigate();
  const { workers, search, setSearch, loading, refresh } = useWorkers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState<Worker | null>(null);
  const { deleteWorker, loading: deleting } = useDeleteWorker(refresh);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Lógica para ir al detalle
  const handleViewDetails = (worker: Worker) => {
    navigate(ROUTES.WORKER_DETAILS.replace(":id", worker.id.toString()));
  };

  // Lógica para ir a editar
  const handleEditWorker = (worker: Worker) => {
    // Por ahora lo dejamos apuntando al detalle o donde prefieras
    navigate(ROUTES.WORKER_EDIT.replace(":id", worker.id.toString()));
  };

  const handleDeleteClick = (worker: Worker) => {
    setWorkerToDelete(worker);
  };

  const handleConfirmDelete = async () => {
    if (!workerToDelete) return;
    await deleteWorker(workerToDelete.id);
    setWorkerToDelete(null); // Cierra el diálogo
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
          onDeleteWorker={handleDeleteClick}
        />
      )}

      {/* MODAL DE CREACIÓN */}
      <CreateWorker
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={!!workerToDelete}
        title="¿Eliminar trabajador?"
        description={`¿Estás seguro de que quieres eliminar a ${workerToDelete?.name}? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setWorkerToDelete(null)}
      />
    </Box>
  );
}
