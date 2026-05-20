import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../../routes/routes";

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
  mes: number;
  anio: number;
  trabajador: string;
}

export default function PagoEditHeader({ mes, anio, trabajador }: Props) {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={() => navigate(ROUTES.PAGOS)} color="primary">
        <ArrowBackIcon />
      </IconButton>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Editar pago — {trabajador}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {MESES[mes]} {anio}
        </Typography>
      </Box>
    </Box>
  );
}
