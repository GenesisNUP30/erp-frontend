import { Paper, Typography, Divider, Box } from '@mui/material';
import type { Worker } from '../../types/IWorkers';
import v from '../../../../validations/validations';

interface Props {
  worker: Worker;
}

export default function WorkerDetailInfo({ worker }: Props) {

  // Renderizador de campos (Lógica fuera del return principal)
  const renderDataField = (label: string, value: string | null | undefined) => (
    <Box sx={{ flex: '1 1 300px', mb: 2 }}>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Typography variant="body1">
        {value || '---'}
      </Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: 2 }}>
      {/* SECCIÓN 1: Identificación */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.workers.labels.name, worker.name)}
        {renderDataField(v.entities.workers.labels.username, worker.username)}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* SECCIÓN 2: Datos Técnicos */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.workers.labels.dni, worker.dni)}
        {renderDataField(v.entities.workers.labels.email, worker.email)}
        {renderDataField(v.entities.workers.labels.telefono, worker.telefono)}
        {renderDataField(v.entities.workers.labels.rol, worker.rol)}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* SECCIÓN 3: Fechas */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.workers.labels.fecha_alta, worker.fecha_alta)}
        {worker.fecha_baja && renderDataField(v.details.fields.fecha_baja, worker.fecha_baja)}
      </Box>
    </Paper>
  );
}