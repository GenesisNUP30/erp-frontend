import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import type { Worker } from "../../types/IWorkers";

interface Props {
  workers: Worker[];
}

export default function WorkersTable({ workers }: Props) {
  if (!workers.length) {
    return <p>Sin elementos para mostrar</p>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nombre</TableCell>
          <TableCell>Usuario</TableCell>
          <TableCell>DNI</TableCell>
          <TableCell>Teléfono</TableCell>
          <TableCell>Rol</TableCell>
          <TableCell>Fecha Alta</TableCell>
          <TableCell>Estado</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {workers.map((worker) => (
          <TableRow key={worker.id}>
            <TableCell>{worker.name}</TableCell>
            <TableCell>{worker.username}</TableCell>
            <TableCell>{worker.dni}</TableCell>
            <TableCell>{worker.telefono}</TableCell>
            <TableCell>{worker.rol}</TableCell>
            <TableCell>{worker.fecha_alta}</TableCell>
            <TableCell>
              <Chip
                label={worker.fecha_baja ? "Inactivo" : "Activo"}
                color={worker.fecha_baja ? "default" : "success"}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
