import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/routes";
import useCampanias from "../hooks/useCampanias";
import useDeleteCampania from "../hooks/useDeleteCampania";
import CampaniasFilters from "../components/list/CampaniasFilters";
import CampaniasTable from "../components/list/CampaniasTable";
import CreateCampania from "../components/create/CreateCampania";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Campania } from "../types/ICampanias";
import usePermissions from "../../dashboard/hooks/usePermissions";

export default function CampaniasPage() {
  const navigate = useNavigate();
  const { canCreateCampanias, canDeleteCampanias } = usePermissions();

  const {
    campanias,
    search,
    setSearch, 
    filterEstado,
    setFilterEstado,
    loading,
    refresh,
    currentPage,
    lastPage,
    perPage,
    total,
    onPageChange,
    onPerPageChange,
  } = useCampanias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaniaToDelete, setCampaniaToDelete] = useState<Campania | null>(
    null,
  );
  const { deleteCampania, loading: deleting } = useDeleteCampania(refresh);

  const handleViewDetails = (campania: Campania) =>
    navigate(ROUTES.CAMPANIA_DETAILS.replace(":id", campania.id.toString()));

  const handleEditCampania = (campania: Campania) =>
    navigate(ROUTES.CAMPANIA_EDIT.replace(":id", campania.id.toString()));

  const handleConfirmDelete = async () => {
    if (!campaniaToDelete) return;
    await deleteCampania(campaniaToDelete.id);
    setCampaniaToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Campañas
      </Typography>
      <CampaniasFilters
        search={search}
        onSearchChange={setSearch}
        filterEstado={filterEstado}
        onFilterEstadoChange={setFilterEstado}
        onAddClick={() => setIsModalOpen(true)}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <CampaniasTable
          campanias={campanias}
          loading={loading}
          canDelete={canDeleteCampanias}
          onViewDetails={handleViewDetails}
          onEditCampania={handleEditCampania}
          onDeleteCampania={setCampaniaToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}

      {canCreateCampanias && (
        <CreateCampania
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refresh();
          }}
        />
      )}

      <ConfirmDialog
        open={!!campaniaToDelete}
        title="¿Eliminar campaña?"
        description={`¿Estás seguro de que quieres eliminar la campaña "${campaniaToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setCampaniaToDelete(null)}
      />
    </Box>
  );
}
