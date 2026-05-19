import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../../routes/routes";
import StatusChip from "../../../../components/shared/StatusChip";
import { recoleccionStatusOptions } from "../../constants/recoleccionStatusOptions";

interface Props {
  fecha: string;
  estado: string;
}

export default function RecoleccionEditHeader({ fecha, estado }: Props) {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton
        onClick={() => navigate(ROUTES.RECOLECCIONES)}
        color="primary"
      >
        <ArrowBackIcon />
      </IconButton>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Editar recolección {fecha}
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
  );
}
