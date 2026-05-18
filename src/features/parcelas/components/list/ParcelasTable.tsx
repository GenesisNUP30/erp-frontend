import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Parcela } from "../../types/IParcelas";
import StatusChip from "../../../../components/shared/StatusChip";
import { parcelaStatusOptions } from "../../constants/parcelaStatusOptions";
import v from "../../../../validations/validations";

interface Props {
  parcelas: Parcela[];
  loading: boolean;
  onViewDetails: (parcela: Parcela) => void;
  onEditParcela: (parcela: Parcela) => void;
  onDeleteParcela: (parcela: Parcela) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export default function ParcelasTable({
  parcelas,
  loading,
  onViewDetails,
  onEditParcela,
  onDeleteParcela,
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: Props) {
  const headers: HeaderOption[] = [
    { id: "nombre", label: v.tableList.headers.nombre },
    { id: "superficie_hectareas", label: v.tableList.headers.superficie },
    { id: "ubicacion", label: v.tableList.headers.ubicacion },
    { id: "estado", label: v.tableList.headers.status },
  ];

  return (
    <GenericTable
      loading={loading}
      items={parcelas}
      headers={headers}
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditParcela}
      onDelete={onDeleteParcela}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(parcela: Parcela) => (
        <>
          <TableCell>{parcela.nombre}</TableCell>
          <TableCell>{parcela.superficie_hectareas} ha</TableCell>
          <TableCell>{parcela.ubicacion}</TableCell>
          <TableCell>
            <StatusChip
              currentValue={parcela.estado}
              options={parcelaStatusOptions}
              canChange={false}
            />
          </TableCell>
        </>
      )}
    />
  );
}
