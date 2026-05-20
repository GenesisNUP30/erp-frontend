import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/routes";
import useVariedades from "../hooks/useVariedades";
import useDeleteVariedad from "../hooks/useDeleteVariedad";
import VariedadesFilters from "../components/list/VariedadesFilters";
import VariedadesTable from "../components/list/VariedadesTable";
import CreateVariedad from "../components/create/CreateVariedad";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Variedad } from "../types/IVariedades";
import usePermissions from "../../dashboard/hooks/usePermissions";

export default function VariedadesPage() {
  const navigate = useNavigate();
  const { canCreateVariedades, canDeleteVariedades } = usePermissions();

  const {
    variedades,
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
  } = useVariedades();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variedadToDelete, setVariedadToDelete] = useState<Variedad | null>(
    null,
  );
  const { deleteVariedad, loading: deleting } = useDeleteVariedad(refresh);

  const handleViewDetails = (variedad: Variedad) =>
    navigate(ROUTES.VARIEDAD_DETAILS.replace(":id", variedad.id.toString()));

  const handleEditVariedad = (variedad: Variedad) =>
    navigate(ROUTES.VARIEDAD_EDIT.replace(":id", variedad.id.toString()));

  const handleConfirmDelete = async () => {
    if (!variedadToDelete) return;
    await deleteVariedad(variedadToDelete.id);
    setVariedadToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Variedades
      </Typography>
      <VariedadesFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={canCreateVariedades ? () => setIsModalOpen(true) : undefined}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <VariedadesTable
          variedades={variedades}
          loading={loading}
          canDelete={canDeleteVariedades}
          onViewDetails={handleViewDetails}
          onEditVariedad={handleEditVariedad}
          onDeleteVariedad={setVariedadToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
      {canCreateVariedades && (
        <CreateVariedad
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refresh();
          }}
        />
      )}
      
      <ConfirmDialog
        open={!!variedadToDelete}
        title="¿Eliminar variedad?"
        description={`¿Estás seguro de que quieres eliminar la variedad "${variedadToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setVariedadToDelete(null)}
      />
    </Box>
  );
}
