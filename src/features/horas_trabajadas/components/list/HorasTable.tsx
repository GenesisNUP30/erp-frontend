import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { HorasTrabajada } from "../../types/IHorasTrabajadas";

interface Props {
  horas: HorasTrabajada[];
  loading: boolean;
  canDelete: boolean;
  canEdit: boolean;
  onViewDetails: (h: HorasTrabajada) => void;
  onEditHoras: (h: HorasTrabajada) => void;
  onDeleteHoras: (h: HorasTrabajada) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (pp: number) => void;
}

const headers: HeaderOption[] = [
  { id: "fecha", label: "Fecha" },
  { id: "trabajador", label: "Trabajador" },
  { id: "tipo_trabajo", label: "Tipo trabajo" },
  { id: "cosecha", label: "Cosecha" },
  { id: "horas", label: "Horas", align: "right" },
  { id: "precio_hora", label: "€/hora", align: "right" },
  { id: "total", label: "Total", align: "right" },
];

export default function HorasTable({
  horas,
  loading,
  canDelete,
  canEdit,
  onViewDetails,
  onEditHoras,
  onDeleteHoras,
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
      items={horas}
      headers={headers}
      menuList={
        canDelete
          ? ["details", "edit", "delete"]
          : canEdit
            ? ["details", "edit"]
            : ["details"]
      }
      onDetails={onViewDetails}
      onEdit={onEditHoras}
      onDelete={onDeleteHoras}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(h: HorasTrabajada) => (
        <>
          <TableCell>{h.fecha}</TableCell>
          <TableCell>{h.trabajador?.name || "---"}</TableCell>
          <TableCell>{h.tipo_trabajo}</TableCell>
          <TableCell>{h.cosecha?.nombre_cosecha || "---"}</TableCell>
          <TableCell align="right">{h.horas}h</TableCell>
          <TableCell align="right">
            {Number(h.precio_hora).toFixed(2)}€
          </TableCell>
          <TableCell align="right">
            {(h.horas * h.precio_hora).toFixed(2)}€
          </TableCell>
        </>
      )}
    />
  );
}
