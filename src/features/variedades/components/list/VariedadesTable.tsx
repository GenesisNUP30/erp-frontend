import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Variedad } from "../../types/IVariedades";
import v from "../../../../validations/validations";

interface Props {
  variedades: Variedad[];
  loading: boolean;
  onViewDetails: (variedad: Variedad) => void;
  onEditVariedad: (variedad: Variedad) => void;
  onDeleteVariedad: (variedad: Variedad) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export default function VariedadesTable({
  variedades,
  loading,
  onViewDetails,
  onEditVariedad,
  onDeleteVariedad,
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: Props) {
  const headers: HeaderOption[] = [
    { id: "nombre", label: v.tableList.headers.nombre },
    { id: "tipo", label: v.tableList.headers.tipo },
  ];

  return (
    <GenericTable
      loading={loading}
      items={variedades}
      headers={headers}
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditVariedad}
      onDelete={onDeleteVariedad}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(variedad: Variedad) => (
        <>
          <TableCell>{variedad.nombre}</TableCell>
          <TableCell>{v.entities.variedades.tipos[variedad.tipo]}</TableCell>
        </>
      )}
    />
  );
}
