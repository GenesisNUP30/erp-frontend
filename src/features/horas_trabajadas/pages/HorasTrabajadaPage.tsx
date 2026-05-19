import { Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import useHorasTrabajadas from "../hooks/useHorasTrabajadas";
import useDeleteHoras from "../hooks/useDeleteHoras";
import HorasFilters from "../components/list/HorasFilters";
import HorasTable from "../components/list/HorasTable";
import CreateHoras from "../components/create/CreateHoras";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { HorasTrabajada } from "../types/IHorasTrabajadas";

export default function HorasTrabajadaPage() {
  const navigate = useNavigate();
  const {
    horas,
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
  } = useHorasTrabajadas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<HorasTrabajada | null>(null);
  const { deleteHoras, loading: deleting } = useDeleteHoras(refresh);

  const handleViewDetails = (h: HorasTrabajada) =>
    navigate(ROUTES.HORAS_DETAILS.replace(":id", h.id.toString()));
  const handleEdit = (h: HorasTrabajada) =>
    navigate(ROUTES.HORAS_EDIT.replace(":id", h.id.toString()));
  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    await deleteHoras(toDelete.id);
    setToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Horas trabajadas
      </Typography>
      <HorasFilters
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <HorasTable
          horas={horas}
          loading={loading}
          onViewDetails={handleViewDetails}
          onEditHoras={handleEdit}
          onDeleteHoras={setToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
      <CreateHoras
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refresh();
        }}
      />
      <ConfirmDialog
        open={!!toDelete}
        title="¿Eliminar registro de horas?"
        description="Solo es posible si no está vinculado a un pago."
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setToDelete(null)}
      />
    </Box>
  );
}
