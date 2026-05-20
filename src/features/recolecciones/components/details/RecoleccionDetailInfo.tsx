import { Paper, Typography, Divider, Box } from "@mui/material";
import type { Recoleccion } from "../../types/IRecolecciones";

interface Props {
  recoleccion: Recoleccion;
}

export default function RecoleccionDetailInfo({ recoleccion }: Props) {
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
  const totalKilos = (recoleccion.num_cajas * recoleccion.kilos_caja).toFixed(
    2,
  );

  return (
    <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Cosecha", recoleccion.cosecha?.nombre_cosecha)}
        {field("Recolector", recoleccion.recolector?.name)}
        {field("Fecha", recoleccion.fecha)}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {field("Nº cajas", recoleccion.num_cajas)}
        {field("Kilos/caja", recoleccion.kilos_caja)}
        {field("Total kilos", `${totalKilos} kg`)}
      </Box>
      {recoleccion.notas && (
        <>
          <Divider sx={{ my: 2 }} />
          {field("Notas", recoleccion.notas)}
        </>
      )}
    </Paper>
  );
}
