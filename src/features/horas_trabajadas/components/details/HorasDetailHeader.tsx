import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../../../routes/routes";

interface Props {
  horasId: number;
  fecha: string;
  trabajador: string;
}

export default function HorasDetailHeader({
  horasId,
  fecha,
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
        <IconButton
          onClick={() => navigate(ROUTES.HORAS_TRABAJADAS)}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {trabajador}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fecha}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() =>
          navigate(ROUTES.HORAS_EDIT.replace(":id", horasId.toString()))
        }
      >
        Editar
      </Button>
    </Box>
  );
}
