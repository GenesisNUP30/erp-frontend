import { Avatar, Paper, Typography, Divider, Box } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
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

      {/* Sección Informativa: Plantaciones (Solo lectura) */}
      <Divider sx={{ my: 2 }} />
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        sx={{
          p: 2,
          bgcolor: "action.hover",
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.light" }}>
          <InventoryIcon />
        </Avatar>
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            {v.entities.variedades.labels.plantaciones_count ||
              "Plantaciones Vinculadas"}
          </Typography>
          <Typography variant="h6" color="primary.main">
            {variedad.plantaciones_count || 0}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
