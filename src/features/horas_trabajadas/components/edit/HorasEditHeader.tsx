import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../../routes/routes";

interface Props {
  fecha: string;
  trabajador: string;
}

export default function HorasEditHeader({ fecha, trabajador }: Props) {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton
        onClick={() => navigate(ROUTES.HORAS_TRABAJADAS)}
        color="primary"
      >
        <ArrowBackIcon />
      </IconButton>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Editar horas — {trabajador}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fecha}
        </Typography>
      </Box>
    </Box>
  );
}
