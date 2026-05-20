import { Box, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick?: () => void;
}

export default function VariedadesFilters({
  search,
  onSearchChange,
  onAddClick,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2} justifyContent="space-between">
      <TextField
        label="Buscar variedad"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
      {onAddClick && (
        <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
          Crear variedad
        </Button>
      )}
    </Box>
  );
}
