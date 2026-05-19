import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Plantacion } from "../../types/IPlantaciones";
import StatusChip from "../../../../components/shared/StatusChip";
import v from "../../../../validations/validations";
import { plantacionStatusOptions } from "../../constants/plantacionStatusOption";

interface Props {
  plantaciones: Plantacion[];
  loading: boolean;
  onViewDetails: (plantacion: Plantacion) => void;
  onEditPlantacion: (plantacion: Plantacion) => void;
  onDeletePlantacion: (plantacion: Plantacion) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export default function PlantacionesTable({
  plantaciones,
  loading,
  onViewDetails,
  onEditPlantacion,
  onDeletePlantacion,
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: Props) {
  const headers: HeaderOption[] = [
    { id: "parcela", label: v.tableList.headers.parcela },
    { id: "variedad", label: v.tableList.headers.variedad },
    { id: "campania", label: v.tableList.headers.campania },
    { id: "fecha_siembra", label: v.tableList.headers.fecha_siembra },
    { id: "numero_plantas", label: v.tableList.headers.numero_plantas },
    { id: "estado", label: v.tableList.headers.status },
  ];

  return (
    <GenericTable
      loading={loading}
      items={plantaciones}
      headers={headers}
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditPlantacion}
      onDelete={onDeletePlantacion}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(plantacion: Plantacion) => (
        <>
          <TableCell>{plantacion.parcela?.nombre || "---"}</TableCell>
          <TableCell>{plantacion.variedad?.nombre || "---"}</TableCell>
          <TableCell>{plantacion.campania?.nombre || "---"}</TableCell>
          <TableCell>{plantacion.fecha_siembra}</TableCell>
          <TableCell>{plantacion.numero_plantas}</TableCell>
          <TableCell>
            <StatusChip
              currentValue={plantacion.estado}
              options={plantacionStatusOptions}
              canChange={false}
            />
          </TableCell>
        </>
      )}
    />
  );
}
