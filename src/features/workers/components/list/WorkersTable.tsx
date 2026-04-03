import {
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

import type { Worker } from "../../types/IWorkers";
import GenericTable from "../../../../components/shared/GenericTable";
import ActionsMenu from "../../../../components/shared/ActionsMenu";

interface WorkerTableProps {
  workers: Worker[];
  onDetails: (worker: Worker) => void;
  onEdit: (worker: Worker) => void;
}

export default function WorkersTable({ workers, onDetails, onEdit }: WorkerTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  if (!workers.length) {
    return <p>Sin elementos para mostrar</p>;
  }

  const handleOpen = (e: React.MouseEvent<HTMLElement>, worker: Worker) => {
    setAnchorEl(e.currentTarget);
    setSelectedWorker(worker);
  };

  const menuOptions = [
    {
      label: "Ver Detalle",
      icon: <VisibilityIcon />,
      onClick: () => onDetails(selectedWorker!),
    },
    {
      label: "Editar",
      icon: <EditIcon />,
      onClick: () => onEdit(selectedWorker!),
    },
  ];

  return (
    <GenericTable headers={["Nombre", "Usuario", "Rol", "Estado"]}>
      {workers.map((worker) => (
        <TableRow key={worker.id}>
          <TableCell>{worker.name}</TableCell>
          <TableCell>{worker.username}</TableCell>
          <TableCell>{worker.rol}</TableCell>
          <TableCell>{/* Chip de estado */}</TableCell>
          <TableCell align="right">
            <IconButton onClick={(e) => handleOpen(e, worker)}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}

      <ActionsMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        options={menuOptions}
      />
    </GenericTable>
  );
}
