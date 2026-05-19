import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/routes";
import usePagos from "../hooks/usePagos";
import useDeletePago from "../hooks/useDeletePago";
import PagosFilters from "../components/list/PagosFilters";
import PagosTable from "../components/list/PagosTable";
import CreatePago from "../components/create/CreatePago";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Pago } from "../types/IPagos";

export default function PagosPage() {
  const navigate = useNavigate();
  const {
    pagos,
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
  } = usePagos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Pago | null>(null);
  const { deletePago, loading: deleting } = useDeletePago(refresh);

  const handleViewDetails = (p: Pago) =>
    navigate(ROUTES.PAGO_DETAILS.replace(":id", p.id.toString()));
  const handleEdit = (p: Pago) =>
    navigate(ROUTES.PAGO_EDIT.replace(":id", p.id.toString()));
  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    await deletePago(toDelete.id);
    setToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Pagos
      </Typography>
      <PagosFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <PagosTable
          pagos={pagos}
          loading={loading}
          onViewDetails={handleViewDetails}
          onEditPago={handleEdit}
          onDeletePago={setToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
      <CreatePago
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refresh();
        }}
      />
      <ConfirmDialog
        open={!!toDelete}
        title="¿Eliminar pago?"
        description="Solo puedes eliminar pagos en estado borrador. Las horas asociadas quedarán sin pago asignado."
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setToDelete(null)}
      />
    </Box>
  );
}
