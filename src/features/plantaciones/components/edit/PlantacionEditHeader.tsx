import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../../routes/routes";
import StatusChip from "../../../../components/shared/StatusChip";
import { plantacionStatusOptions } from "../../constants/plantacionStatusOption";
interface Props {
  titulo: string;
  estado: string;
}

export default function PlantacionEditHeader({ titulo, estado }: Props) {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={() => navigate(ROUTES.PLANTACIONES)} color="primary">
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
  );
}
