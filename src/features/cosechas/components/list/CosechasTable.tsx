import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Cosecha } from "../../types/ICosechas";
import StatusChip from "../../../../components/shared/StatusChip";
import { cosechaStatusOptions } from "../../constants/cosechaStatusOptions";

interface Props {
  cosechas: Cosecha[];
  loading: boolean;
  onViewDetails: (c: Cosecha) => void;
  onEditCosecha: (c: Cosecha) => void;
  onDeleteCosecha: (c: Cosecha) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (pp: number) => void;
}

const headers: HeaderOption[] = [
  { id: "nombre_cosecha", label: "Nombre cosecha" },
  { id: "campania", label: "Campaña" },
  { id: "fecha_inicio", label: "Inicio" },
  { id: "fecha_fin", label: "Fin" },
  { id: "estado", label: "Estado" },
];

export default function CosechasTable({
  cosechas,
  loading,
  onViewDetails,
  onEditCosecha,
  onDeleteCosecha,
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: Props) {
  return (
    <GenericTable
      loading={loading}
      items={cosechas}
      headers={headers}
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditCosecha}
      onDelete={onDeleteCosecha}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(c: Cosecha) => (
        <>
          <TableCell>{c.nombre_cosecha}</TableCell>
          <TableCell>{c.campania?.nombre || "---"}</TableCell>
          <TableCell>{c.fecha_inicio}</TableCell>
          <TableCell>{c.fecha_fin || "---"}</TableCell>
          <TableCell>
            <StatusChip
              currentValue={c.estado}
              options={cosechaStatusOptions}
              canChange={false}
            />
          </TableCell>
        </>
      )}
    />
  );
}
