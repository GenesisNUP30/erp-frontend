import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../../../routes/routes";
import StatusChip from "../../../../components/shared/StatusChip";
import { recoleccionStatusOptions } from "../../constants/recoleccionStatusOptions";

interface Props {
  recoleccionId: number;
  fecha: string;
  estado: string;
}

export default function RecoleccionDetailHeader({
  recoleccionId,
  fecha,
  estado,
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
          onClick={() => navigate(ROUTES.RECOLECCIONES)}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Recolección {fecha}
          </Typography>
          <Box mt={0.5}>
            <StatusChip
              currentValue={estado}
              options={recoleccionStatusOptions}
              canChange={false}
            />
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<EditIcon />}
        onClick={() =>
          navigate(
            ROUTES.RECOLECCION_EDIT.replace(":id", recoleccionId.toString()),
          )
        }
      >
        Editar
      </Button>
    </Box>
  );
}
