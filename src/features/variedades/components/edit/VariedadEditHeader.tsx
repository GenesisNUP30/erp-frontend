import { Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../../../routes/routes";

interface Props {
  nombre: string;
}

export default function VariedadEditHeader({ nombre }: Props) {
  const navigate = useNavigate();
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={() => navigate(ROUTES.VARIEDADES)} color="primary">
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {nombre}
      </Typography>
    </Box>
  );
}
