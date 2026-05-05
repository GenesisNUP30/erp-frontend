import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Campania } from "../../types/ICampanias";
import StatusChip from "../../../../components/shared/StatusChip";
import { campaniaStatusOptions } from "../../constants/campaniaStatusOptions";
import v from "../../../../validations/validations";

interface Props {
  campanias: Campania[];
  loading: boolean;
  onViewDetails: (campania: Campania) => void;
  onEditCampania: (campania: Campania) => void;
  onDeleteCampania: (campania: Campania) => void;
}

export default function CampaniasTable({ campanias, loading, onViewDetails, onEditCampania, onDeleteCampania }: Props) {
  const headers: HeaderOption[] = [
    { id: "nombre", label: v.tableList.headers.nombre },
    { id: "fecha_inicio", label: v.tableList.headers.fecha_inicio },
    { id: "fecha_fin", label: v.tableList.headers.fecha_fin },
    { id: "estado", label: v.tableList.headers.status },
  ];

  return (
    <GenericTable
      loading={loading}
      items={campanias}
      headers={headers}
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditCampania}
      onDelete={onDeleteCampania}
      renderRow={(campania: Campania) => (
        <>
          <TableCell>{campania.nombre}</TableCell>
          <TableCell>{campania.fecha_inicio}</TableCell>
          <TableCell>{campania.fecha_fin || '---'}</TableCell>
          <TableCell>
            <StatusChip currentValue={campania.estado} options={campaniaStatusOptions} canChange={false} />
          </TableCell>
        </>
      )}
    />
  );
}