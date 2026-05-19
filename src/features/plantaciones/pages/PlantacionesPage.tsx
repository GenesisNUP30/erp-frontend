import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/routes";
import usePlantaciones from "../hooks/usePlantaciones";
import useDeletePlantacion from "../hooks/useDeletePlantacion";
import PlantacionesFilters from "../components/list/PlantacionesFilters";
import PlantacionesTable from "../components/list/PlantacionesTable";
import CreatePlantacion from "../components/create/CreatePlantacion";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Plantacion } from "../types/IPlantaciones";

export default function PlantacionesPage() {
  const navigate = useNavigate();
  const {
    plantaciones,
    search,
    setSearch,
    loading,
    refresh,
    currentPage,
    lastPage,
    perPage,
    total,
    onPageChange,
    onPerPageChange,
  } = usePlantaciones();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plantacionToDelete, setPlantacionToDelete] =
    useState<Plantacion | null>(null);
  const { deletePlantacion, loading: deleting } = useDeletePlantacion(refresh);

  const handleViewDetails = (plantacion: Plantacion) =>
    navigate(
      ROUTES.PLANTACION_DETAILS.replace(":id", plantacion.id.toString()),
    );

  const handleEditPlantacion = (plantacion: Plantacion) =>
    navigate(ROUTES.PLANTACION_EDIT.replace(":id", plantacion.id.toString()));

  const handleConfirmDelete = async () => {
    if (!plantacionToDelete) return;
    await deletePlantacion(plantacionToDelete.id);
    setPlantacionToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Plantaciones
      </Typography>
      <PlantacionesFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <PlantacionesTable
          plantaciones={plantaciones}
          loading={loading}
          onViewDetails={handleViewDetails}
          onEditPlantacion={handleEditPlantacion}
          onDeletePlantacion={setPlantacionToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
      <CreatePlantacion
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refresh();
        }}
      />
      <ConfirmDialog
        open={!!plantacionToDelete}
        title="¿Eliminar plantación?"
        description={`¿Estás seguro de que quieres eliminar esta plantación? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setPlantacionToDelete(null)}
      />
    </Box>
  );
}
