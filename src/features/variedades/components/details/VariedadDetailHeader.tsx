import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../../../routes/routes";

interface Props {
  variedadId: number;
  nombre: string;
  tipo: string;
}

export default function VariedadDetailHeader({
  variedadId,
  nombre,
  tipo,
}: Props) {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton onClick={() => navigate(ROUTES.VARIEDADES)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {tipo}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() =>
          navigate(
            ROUTES.VARIEDAD_DETAILS.replace(":id", variedadId.toString()) +
              "/editar",
          )
        }
      >
        Editar Variedad
      </Button>
    </Box>
  );
}
