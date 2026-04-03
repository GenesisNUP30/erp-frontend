import { TableCell, Chip } from '@mui/material';
import GenericTable from '../../../../components/shared/tables/GenericTable';
import type { HeaderOption } from '../../../../components/shared/tables/types';
import type { Worker } from '../../types/IWorkers';

interface Props {
  workers: Worker[];
  loading: boolean;
  onViewDetails: (worker: Worker) => void;
  onEditWorker: (worker: Worker) => void;
}

export default function WorkersTable({ workers, loading, onViewDetails, onEditWorker }: Props) {
  
  // Definimos las columnas
  const headers: HeaderOption[] = [
    { id: 'name', label: 'Nombre completo' },
    { id: 'username', label: 'Usuario' },
    { id: 'rol', label: 'Rol' },
    { id: 'status', label: 'Estado' },
  ];

  return (
    <GenericTable
      loading={loading}
      items={workers}
      headers={headers}
      menuList={['details', 'edit']} 
      onDetails={onViewDetails}
      onEdit={onEditWorker}
      renderRow={(worker: Worker) => (
        <>
          <TableCell>{worker.name}</TableCell>
          <TableCell>{worker.username}</TableCell>
          <TableCell sx={{ textTransform: 'capitalize' }}>{worker.rol}</TableCell>
          <TableCell>
            <Chip
              label={worker.fecha_baja ? "Inactivo" : "Activo"}
              color={worker.fecha_baja ? "default" : "success"}
              size="small"
            />
          </TableCell>
        </>
      )}
    />
  );
}