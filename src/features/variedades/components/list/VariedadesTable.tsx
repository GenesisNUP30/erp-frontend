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
}

export default function VariedadesTable({ variedades, loading, onViewDetails, onEditVariedad, onDeleteVariedad }: Props) {
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
      renderRow={(variedad: Variedad) => (
        <>
          <TableCell>{variedad.nombre}</TableCell>
          <TableCell>{v.entities.variedades.tipos[variedad.tipo]}</TableCell>
        </>
      )}
    />
  );
}