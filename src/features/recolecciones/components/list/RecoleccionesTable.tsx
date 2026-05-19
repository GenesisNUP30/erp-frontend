import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Recoleccion } from "../../types/IRecolecciones";
import StatusChip from "../../../../components/shared/StatusChip";
import { recoleccionStatusOptions } from "../../constants/recoleccionStatusOptions";

interface Props {
  recolecciones: Recoleccion[];
  loading: boolean;
  onViewDetails: (r: Recoleccion) => void;
  onEditRecoleccion: (r: Recoleccion) => void;
  onDeleteRecoleccion: (r: Recoleccion) => void;
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (pp: number) => void;
}

const headers: HeaderOption[] = [
  { id: "fecha", label: "Fecha" },
  { id: "cosecha", label: "Cosecha" },
  { id: "recolector", label: "Recolector" },
  { id: "num_cajas", label: "Cajas", align: "right" },
  { id: "kilos", label: "Kg totales", align: "right" },
  { id: "estado", label: "Estado" },
];

export default function RecoleccionesTable({
  recolecciones,
  loading,
  onViewDetails,
  onEditRecoleccion,
  onDeleteRecoleccion,
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
      items={recolecciones}
      headers={headers}
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditRecoleccion}
      onDelete={onDeleteRecoleccion}
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      renderRow={(r: Recoleccion) => (
        <>
          <TableCell>{r.fecha}</TableCell>
          <TableCell>{r.cosecha?.nombre_cosecha || "---"}</TableCell>
          <TableCell>{r.recolector?.name || "---"}</TableCell>
          <TableCell align="right">{r.num_cajas}</TableCell>
          <TableCell align="right">
            {(r.num_cajas * r.kilos_caja).toFixed(2)} kg
          </TableCell>
          <TableCell>
            <StatusChip
              currentValue={r.estado}
              options={recoleccionStatusOptions}
              canChange={false}
            />
          </TableCell>
        </>
      )}
    />
  );
}
