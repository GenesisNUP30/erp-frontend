import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  onAddClick: () => void;
  filterEstado: string;
  onFilterEstadoChange: (v: string) => void;
}

export default function PlantacionesFilters({
  search,
  onSearchChange,
  onAddClick,
  filterEstado,
  onFilterEstadoChange,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
      <TextField
        label="Buscar por parcela, variedad o campaña"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: "1 1 200px" }}
      />
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          value={filterEstado}
          label="Estado"
          onChange={(e) => onFilterEstadoChange(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="planificada">Planificada</MenuItem>
          <MenuItem value="activa">Activa</MenuItem>
          <MenuItem value="finalizada">Finalizada</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
        Crear plantación
      </Button>
    </Box>
  );
}
