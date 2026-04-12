import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Worker } from "../../types/IWorkers";
import v from "../../../../validations/validations";
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
  // Definimos las columnas
  const headers: HeaderOption[] = [
    { id: "name", label: v.tableList.headers.fullName },
    { id: "username", label: v.tableList.headers.username },
    { id: "rol", label: v.tableList.headers.role },
    { id: "status", label: v.tableList.headers.status },
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
              currentValue={worker.estado}
              options={[
                { label: v.entities.workers.status.active, value: "activo", color: "success" },
                { label: v.entities.workers.status.inactive, value: "inactivo", color: "default" },
              ]}
              canChange={false} // En la tabla quizás prefieres que solo se cambie desde el menú de acciones
            />
          </TableCell>
        </>
      )}
    />
  );
}
