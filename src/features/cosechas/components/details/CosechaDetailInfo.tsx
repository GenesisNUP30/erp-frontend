import { Paper, Typography, Divider, Box } from "@mui/material";
import type { Cosecha } from "../../types/ICosechas";

interface Props {
  cosecha: Cosecha;
}

export default function CosechaDetailInfo({ cosecha }: Props) {
  const field = (label: string, value: string | number | null | undefined) => (
    <Box sx={{ flex: "1 1 280px", mb: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <Typography variant="body1">{value ?? "---"}</Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Nombre cosecha", cosecha.nombre_cosecha)}
        {field("Campaña", cosecha.campania?.nombre)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Parcela", cosecha.plantacion?.parcela?.nombre)}
        {field("Variedad", cosecha.plantacion?.variedad?.nombre)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Fecha inicio", cosecha.fecha_inicio)}
        {field("Fecha fin", cosecha.fecha_fin)}
        {field("Recolecciones registradas", cosecha.recolecciones_count)}
      </Box>
    </Paper>
  );
}
