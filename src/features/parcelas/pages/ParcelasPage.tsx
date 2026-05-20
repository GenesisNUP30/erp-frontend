import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/routes";
import useParcelas from "../hooks/useParcelas";
import useDeleteParcela from "../hooks/useDeleteParcela";
import ParcelasFilters from "../components/list/ParcelasFilters";
import ParcelasTable from "../components/list/ParcelasTable";
import CreateParcela from "../components/create/CreateParcela";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Parcela } from "../types/IParcelas";
import usePermissions from "../../dashboard/hooks/usePermissions";

export default function ParcelasPage() {
  const navigate = useNavigate();
  const { canCreateParcelas, canDeleteParcelas } = usePermissions();

  const {
    parcelas,
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
  } = useParcelas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parcelaToDelete, setParcelaToDelete] = useState<Parcela | null>(null);
  const { deleteParcela, loading: deleting } = useDeleteParcela(refresh);

  const handleViewDetails = (parcela: Parcela) =>
    navigate(ROUTES.PARCELA_DETAILS.replace(":id", parcela.id.toString()));

  const handleEditParcela = (parcela: Parcela) =>
    navigate(ROUTES.PARCELA_EDIT.replace(":id", parcela.id.toString()));

  const handleConfirmDelete = async () => {
    if (!parcelaToDelete) return;
    await deleteParcela(parcelaToDelete.id);
    setParcelaToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Parcelas
      </Typography>

      <ParcelasFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={canCreateParcelas ? () => setIsModalOpen(true) : undefined}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <ParcelasTable
          parcelas={parcelas}
          loading={loading}
          canDelete={canDeleteParcelas}
          onViewDetails={handleViewDetails}
          onEditParcela={handleEditParcela}
          onDeleteParcela={setParcelaToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}

      {canCreateParcelas && (
        <CreateParcela
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            refresh();
          }}
        />
      )}

      <ConfirmDialog
        open={!!parcelaToDelete}
        title="¿Eliminar parcela?"
        description={`¿Estás seguro de que quieres eliminar la parcela "${parcelaToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setParcelaToDelete(null)}
      />
    </Box>
  );
}
