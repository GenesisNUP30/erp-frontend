import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Pago } from "../../types/IPagos";
import StatusChip from "../../../../components/shared/StatusChip";
import { pagoStatusOptions } from "../../constants/pagoStatusOptions";

const MESES = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface Props {
  pagos: Pago[];
  loading: boolean;
  canDelete: boolean;
  canEdit: boolean;
  onViewDetails: (p: Pago) => void;
  onEditPago: (p: Pago) => void;
  onDeletePago: (p: Pago) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (pp: number) => void;
}

const headers: HeaderOption[] = [
  { id: "trabajador", label: "Trabajador" },
  { id: "periodo", label: "Período" },
  { id: "total_horas", label: "Total horas", align: "right" },
  { id: "monto_total", label: "Importe", align: "right" },
  { id: "estado", label: "Estado" },
];

export default function PagosTable({
  pagos,
  loading,
  canDelete,
  canEdit,
  onViewDetails,
  onEditPago,
  onDeletePago,
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
      items={pagos}
      headers={headers}
      menuList={
        canDelete
          ? ["details", "edit", "delete"]
          : canEdit
            ? ["details", "edit"]
            : ["details"]
      }
      onDetails={onViewDetails}
      onEdit={onEditPago}
      onDelete={onDeletePago}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(p: Pago) => (
        <>
          <TableCell>{p.trabajador?.name || "---"}</TableCell>
          <TableCell>
            {MESES[p.mes]} {p.anio}
          </TableCell>
          <TableCell align="right">
            {Number(p.total_horas).toFixed(2)}h
          </TableCell>
          <TableCell align="right">
            {Number(p.monto_total).toFixed(2)}€
          </TableCell>
          <TableCell>
            <StatusChip
              currentValue={p.estado}
              options={pagoStatusOptions}
              canChange={false}
            />
          </TableCell>
        </>
      )}
    />
  );
}
