import { Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import useRecolecciones from "../hooks/useRecolecciones";
import useDeleteRecoleccion from "../hooks/useDeleteRecoleccion";
import RecoleccionesFilters from "../components/list/RecoleccionesFilters";
import RecoleccionesTable from "../components/list/RecoleccionesTable";
import CreateRecoleccion from "../components/create/CreateRecoleccion";
import ConfirmDialog from "../../../components/shared/ConfirmDialog";
import type { Recoleccion } from "../types/IRecolecciones";
import usePermissions from "../../dashboard/hooks/usePermissions";

export default function RecoleccionesPage() {
  const navigate = useNavigate();
  const { canDeleteRecolecciones } = usePermissions();

  const {
    recolecciones,
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
  } = useRecolecciones();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Recoleccion | null>(null);
  const { deleteRecoleccion, loading: deleting } =
    useDeleteRecoleccion(refresh);

  const handleViewDetails = (r: Recoleccion) =>
    navigate(ROUTES.RECOLECCION_DETAILS.replace(":id", r.id.toString()));
  const handleEdit = (r: Recoleccion) =>
    navigate(ROUTES.RECOLECCION_EDIT.replace(":id", r.id.toString()));
  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    await deleteRecoleccion(toDelete.id);
    setToDelete(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Recolecciones
      </Typography>
      <RecoleccionesFilters
        search={search}
        filterEstado={filterEstado}
        onFilterEstadoChange={setFilterEstado}
        onSearchChange={setSearch}
        onAddClick={() => setIsModalOpen(true)}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <RecoleccionesTable
          recolecciones={recolecciones}
          loading={loading}
          canDelete={canDeleteRecolecciones}
          onViewDetails={handleViewDetails}
          onEditRecoleccion={handleEdit}
          onDeleteRecoleccion={setToDelete}
          currentPage={currentPage}
          lastPage={lastPage}
          perPage={perPage}
          total={total}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      )}
      <CreateRecoleccion
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refresh();
        }}
      />
      <ConfirmDialog
        open={!!toDelete}
        title="¿Eliminar recolección?"
        description="¿Seguro que quieres eliminar este registro de recolección?"
        confirmLabel="Eliminar"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setToDelete(null)}
      />
    </Box>
  );
}
