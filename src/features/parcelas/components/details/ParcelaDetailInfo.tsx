import { Paper, Typography, Divider, Box } from '@mui/material';
import type { Parcela } from '../../types/IParcelas';
import v from '../../../../validations/validations';

interface Props { parcela: Parcela; }

export default function ParcelaDetailInfo({ parcela }: Props) {
  const renderDataField = (label: string, value: string | null | undefined) => (
    <Box sx={{ flex: '1 1 300px', mb: 2 }}>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Typography variant="body1">{value || '---'}</Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.parcelas.labels.nombre, parcela.nombre)}
        {renderDataField(v.entities.parcelas.labels.superficie_hectareas, `${parcela.superficie_hectareas} ha`)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.parcelas.labels.ubicacion, parcela.ubicacion)}
      </Box>
    </Paper>
  );
}