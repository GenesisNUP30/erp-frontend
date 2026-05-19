import { Paper, Typography, Divider, Box } from "@mui/material";
import type { HorasTrabajada } from "../../types/IHorasTrabajadas";

interface Props {
  horas: HorasTrabajada;
}

export default function HorasDetailInfo({ horas }: Props) {
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
  const total = (horas.horas * horas.precio_hora).toFixed(2);

  return (
    <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Trabajador", horas.trabajador?.name)}
        {field("Cosecha", horas.cosecha?.nombre_cosecha)}
        {field("Fecha", horas.fecha)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Tipo de trabajo", horas.tipo_trabajo)}
        {field("Horas", `${horas.horas}h`)}
        {field("Precio/hora", `${Number(horas.precio_hora).toFixed(2)}€`)}
        {field("Total", `${total}€`)}
      </Box>
      {horas.pago && (
        <>
          <Divider sx={{ my: 2 }} />
          {field(
            "Pago vinculado",
            `${horas.pago.mes}/${horas.pago.anio} — ${horas.pago.estado}`,
          )}
        </>
      )}
    </Paper>
  );
}
