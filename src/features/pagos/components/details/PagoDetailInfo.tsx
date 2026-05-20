import { Paper, Typography, Divider, Box, Chip } from "@mui/material";
import type { Pago } from "../../types/IPagos";

const MESES = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface Props {
  pago: Pago & { horasTrabajadas?: any[] };
}

export default function PagoDetailInfo({ pago }: Props) {
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
        {field("Trabajador", pago.trabajador?.name)}
        {field("Período", `${MESES[pago.mes]} ${pago.anio}`)}
        {field("Fecha de pago", pago.fecha_pago)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Total horas", `${Number(pago.total_horas).toFixed(2)}h`)}
        {field("Importe total", `${Number(pago.monto_total).toFixed(2)}€`)}
      </Box>
      {pago.horasTrabajadas && pago.horasTrabajadas.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Registros de horas incluidos
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {pago.horasTrabajadas.map((h: any) => (
              <Chip
                key={h.id}
                label={`${h.fecha} — ${h.horas}h — ${h.cosecha?.nombre_cosecha ?? "Sin cosecha"}`}
                size="small"
              />
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
}
