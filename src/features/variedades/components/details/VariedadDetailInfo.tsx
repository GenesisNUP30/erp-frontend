import { Paper, Typography, Divider, Box } from "@mui/material";
import type { Variedad } from "../../types/IVariedades";
import v from "../../../../validations/validations";

interface Props {
  variedad: Variedad;
}

export default function VariedadDetailInfo({ variedad }: Props) {
  const renderDataField = (label: string, value: string | null | undefined) => (
    <Box sx={{ flex: "1 1 300px", mb: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <Typography variant="body1">{value || "---"}</Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: 2 }}>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {renderDataField(v.entities.variedades.labels.nombre, variedad.nombre)}
        {renderDataField(
          v.entities.variedades.labels.tipo,
          v.entities.variedades.tipos[variedad.tipo],
        )}
      </Box>
      {variedad.descripcion && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            {renderDataField(
              v.entities.variedades.labels.descripcion,
              variedad.descripcion,
            )}
          </Box>
        </>
      )}
    </Paper>
  );
}
