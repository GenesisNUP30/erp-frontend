import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Worker } from "../../types/IWorkers";
import validations from "../../../../validations/validations";
import StatusChip from "../../../../components/shared/StatusChip";

interface Props {
  workers: Worker[];
  loading: boolean;
  onViewDetails: (worker: Worker) => void;
  onEditWorker: (worker: Worker) => void;
}

export default function WorkersTable({
  workers,
  loading,
  onViewDetails,
  onEditWorker,
}: Props) {
  const l = validations.tableList.headers; // Acceso directo a los labels de la tabla
  // Definimos las columnas
  const headers: HeaderOption[] = [
    { id: "name", label: l.fullName },
    { id: "username", label: l.username },
    { id: "rol", label: l.role },
    { id: "status", label: l.status },
  ];

  return (
    <GenericTable
      loading={loading}
      items={workers}
      headers={headers}
      menuList={["details", "edit"]}
      onDetails={onViewDetails}
      onEdit={onEditWorker}
      renderRow={(worker: Worker) => (
        <>
          <TableCell>{worker.name}</TableCell>
          <TableCell>{worker.username}</TableCell>
          <TableCell sx={{ textTransform: "capitalize" }}>
            {worker.rol}
          </TableCell>
          <TableCell>
            <StatusChip
              currentValue={worker.fecha_baja ? "inactive" : "active"}
              options={[
                { label: "Activo", value: "active", color: "success" },
                { label: "Inactivo", value: "inactive", color: "default" },
              ]}
              canChange={false} // En la tabla quizás prefieres que solo se cambie desde el menú de acciones
            />
          </TableCell>
        </>
      )}
    />
  );
}
