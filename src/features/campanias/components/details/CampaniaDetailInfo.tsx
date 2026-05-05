import { Paper, Typography, Divider, Box } from '@mui/material';
import type { Campania } from '../../types/ICampanias';
import v from '../../../../validations/validations';

interface Props { campania: Campania; }

export default function CampaniaDetailInfo({ campania }: Props) {
  const renderDataField = (label: string, value: string | null | undefined) => (
    <Box sx={{ flex: '1 1 300px', mb: 2 }}>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 'bold' }}>{label}</Typography>
      <Typography variant="body1">{value || '---'}</Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.campanias.labels.nombre, campania.nombre)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.campanias.labels.fecha_inicio, campania.fecha_inicio)}
        {campania.fecha_fin && renderDataField(v.entities.campanias.labels.fecha_fin, campania.fecha_fin)}
      </Box>
      {campania.descripcion && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            {renderDataField(v.entities.campanias.labels.descripcion, campania.descripcion)}
          </Box>
        </>
      )}
    </Paper>
  );
}