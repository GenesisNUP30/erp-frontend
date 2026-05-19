import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { ROUTES } from "../../../../routes/routes";
import StatusChip from "../../../../components/shared/StatusChip";
import { plantacionStatusOptions } from "../../constants/plantacionStatusOption";
interface Props {
  plantacionId: number;
  titulo: string;
  estado: string;
}

export default function PlantacionDetailHeader({
  plantacionId,
  titulo,
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
          onClick={() => navigate(ROUTES.PLANTACIONES)}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {titulo}
          </Typography>
          <Box mt={0.5}>
            <StatusChip
              currentValue={estado}
              options={plantacionStatusOptions}
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
            ROUTES.PLANTACION_DETAILS.replace(":id", plantacionId.toString()) +
              "/editar",
          )
        }
      >
        Editar Plantación
      </Button>
    </Box>
  );
}
