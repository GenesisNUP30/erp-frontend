import { TableCell } from "@mui/material";
import GenericTable from "../../../../components/shared/tables/GenericTable";
import type { HeaderOption } from "../../../../components/shared/tables/types";
import type { Worker } from "../../types/IWorkers";
import v from "../../../../validations/validations";
import StatusChip, { type StatusOption } from "../../../../components/shared/StatusChip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

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

  const workerStatusOptions: StatusOption[] = [
    {
      label: "Activo",
      value: "activo",
      color: "success",
      icon: <CheckCircleIcon sx={{ fontSize: "16px" }} />,
    },
    {
      label: "Inactivo",
      value: "inactivo",
      color: "error",
      icon: <RemoveCircleIcon sx={{ fontSize: "16px" }} />,
    },
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
              options={workerStatusOptions}
              canChange={false} // En la tabla quizás prefieres que solo se cambie desde el menú de acciones
            />
          </TableCell>
        </>
      )}
    />
  );
}
