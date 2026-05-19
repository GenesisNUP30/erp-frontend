import { Paper, Typography, Divider, Box } from "@mui/material";
import type { Plantacion } from "../../types/IPlantaciones";
import v from "../../../../validations/validations";

interface Props {
  plantacion: Plantacion;
}

export default function PlantacionDetailInfo({ plantacion }: Props) {
  const renderDataField = (
    label: string,
    value: string | number | null | undefined,
  ) => (
    <Box sx={{ flex: "1 1 300px", mb: 2 }}>
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
        {renderDataField(
          v.entities.plantaciones.labels.parcela,
          plantacion.parcela?.nombre,
        )}
        {renderDataField(
          v.entities.plantaciones.labels.variedad,
          plantacion.variedad?.nombre,
        )}
        {renderDataField(
          v.entities.plantaciones.labels.campania,
          plantacion.campania?.nombre,
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(
          v.entities.plantaciones.labels.numero_plantas,
          plantacion.numero_plantas,
        )}
        {renderDataField(
          v.entities.plantaciones.labels.fecha_siembra,
          plantacion.fecha_siembra,
        )}
        {plantacion.fecha_fin &&
          renderDataField(
            v.entities.plantaciones.labels.fecha_fin,
            plantacion.fecha_fin,
          )}
      </Box>
    </Paper>
  );
}
