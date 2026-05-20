import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/routes";
import useCosechas from "../hooks/useCosechas";
import useDeleteCosecha from "../hooks/useDeleteCosecha";
import CosechasFilters from "../components/list/CosechasFilters";
import CosechasTable from "../components/list/CosechasTable";
import CreateCosecha from "../components/create/CreateCosecha";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Cosecha } from "../types/ICosechas";
import usePermissions from "../../dashboard/hooks/usePermissions";

export default function CosechasPage() {
  const navigate = useNavigate();
  const { canCreateCosechas, canDeleteCosechas } = usePermissions();

  const {
    cosechas,
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
  } = useCosechas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cosechaToDelete, setCosechaToDelete] = useState<Cosecha | null>(null);
  const { deleteCosecha, loading: deleting } = useDeleteCosecha(refresh);

  const handleViewDetails = (c: Cosecha) =>
    navigate(ROUTES.COSECHA_DETAILS.replace(":id", c.id.toString()));
  const handleEdit = (c: Cosecha) =>
    navigate(ROUTES.COSECHA_EDIT.replace(":id", c.id.toString()));
  const handleConfirmDelete = async () => {
    if (!cosechaToDelete) return;
    await deleteCosecha(cosechaToDelete.id);
    setCosechaToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Cosechas
      </Typography>
      <CosechasFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={canCreateCosechas ? () => setIsModalOpen(true) : undefined}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <CosechasTable
          cosechas={cosechas}
          loading={loading}
          canDelete={canDeleteCosechas}
          onViewDetails={handleViewDetails}
          onEditCosecha={handleEdit}
          onDeleteCosecha={setCosechaToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}

      {canCreateCosechas && (
        <CreateCosecha
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refresh();
          }}
        />
      )}

      <ConfirmDialog
        open={!!cosechaToDelete}
        title="¿Eliminar cosecha?"
        description={`¿Seguro que quieres eliminar "${cosechaToDelete?.nombre_cosecha}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setCosechaToDelete(null)}
      />
    </Box>
  );
}
