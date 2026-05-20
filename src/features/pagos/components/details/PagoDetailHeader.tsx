import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../../../routes/routes";
import StatusChip from "../../../../components/shared/StatusChip";
import { pagoStatusOptions } from "../../constants/pagoStatusOptions";

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
  pagoId: number;
  mes: number;
  anio: number;
  estado: string;
  trabajador: string;
}

export default function PagoDetailHeader({
  pagoId,
  mes,
  anio,
  estado,
  trabajador,
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
        <IconButton onClick={() => navigate(ROUTES.PAGOS)} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {trabajador}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {MESES[mes]} {anio}
          </Typography>
          <Box mt={0.5}>
            <StatusChip
              currentValue={estado}
              options={pagoStatusOptions}
              canChange={false}
            />
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() =>
          navigate(ROUTES.PAGO_EDIT.replace(":id", pagoId.toString()))
        }
      >
        Editar estado
      </Button>
    </Box>
  );
}
