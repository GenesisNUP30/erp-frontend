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
  filterRol: string;
  onFilterRolChange: (v: string) => void;
}

export default function WorkersFilters({
  search,
  onSearchChange,
  onAddClick,
  filterEstado,
  onFilterEstadoChange,
  filterRol,
  onFilterRolChange,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap" alignItems="center">
      <TextField
        label="Buscar por nombre, usuario o DNI"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: "1 1 200px" }}
      />
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          value={filterEstado}
          label="Estado"
          onChange={(e) => onFilterEstadoChange(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="activo">Activo</MenuItem>
          <MenuItem value="inactivo">Inactivo</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Rol</InputLabel>
        <Select
          value={filterRol}
          label="Rol"
          onChange={(e) => onFilterRolChange(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="administrador">Administrador</MenuItem>
          <MenuItem value="encargado">Encargado</MenuItem>
          <MenuItem value="recolector">Recolector</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddClick}>
        Crear trabajador
      </Button>
    </Box>
  );
}
