import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onAddClick: () => void;
}

export default function RecoleccionesFilters({
  search,
  onSearchChange,
  onAddClick,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2} justifyContent="space-between">
      <TextField
        label="Buscar por cosecha o recolector"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
        Registrar recolección
      </Button>
    </Box>
  );
}
