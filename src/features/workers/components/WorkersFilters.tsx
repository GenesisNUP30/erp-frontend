import { Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function WorkersFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2} justifyContent="space-between">
      <TextField
        label="Buscar trabajador"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />

      <Button variant="contained" startIcon={<AddIcon />}>
        Crear trabajador
      </Button>
    </Box>
  );
}