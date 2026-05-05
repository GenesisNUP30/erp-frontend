import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Worker } from "../../types/IWorkers";
import v from "../../../../validations/validations";
import StatusChip from "../../../../components/shared/StatusChip";
import { workerStatusOptions } from '../../constants/workerStatusOptions';

interface Props {
  workers: Worker[];
  loading: boolean;
  onViewDetails: (worker: Worker) => void;
  onEditWorker: (worker: Worker) => void;
  onDeleteWorker: (worker: Worker) => void;
}

export default function WorkersTable({
  workers,
  loading,
  onViewDetails,
  onEditWorker,
  onDeleteWorker,
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
      menuList={["details", "edit", "delete"]}
      onDetails={onViewDetails}
      onEdit={onEditWorker}
      onDelete={onDeleteWorker}
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
              options={workerStatusOptions}
              canChange={false}
            />
          </TableCell>
        </>
      )}
    />
  );
}
