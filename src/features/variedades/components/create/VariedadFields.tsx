import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import type { VariedadFormData } from "../../schema/variedadSchema";
import v from "../../../../validations/validations";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<VariedadFormData>;
  serverErrors?: Record<string, string[]> | null;
}

export default function VariedadFields({
  register,
  errors,
  control,
  serverErrors,
}: Props) {
  const getError = (fieldName: string) => {
    if (errors[fieldName]?.message) return errors[fieldName]?.message as string;
    if (serverErrors?.[fieldName]) return serverErrors[fieldName][0];
    return null;
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        {v.createForm.subtitle}
      </Typography>

      {/* Fila 1: Nombre y Tipo */}
      <Box display="flex" gap={2} flexWrap="wrap">
        <FormControl error={!!getError("nombre")} sx={{ flex: "1 1 300px" }}>
          <InputLabel htmlFor="nombre">
            {v.entities.variedades.labels.nombre}
          </InputLabel>
          <OutlinedInput
            id="nombre"
            label={v.entities.variedades.labels.nombre}
            {...register("nombre")}
          />
          <FormHelperText>{getError("nombre")}</FormHelperText>
        </FormControl>

        <FormControl error={!!getError("tipo")} sx={{ flex: "1 1 200px" }}>
          <InputLabel id="tipo-label">
            {v.entities.variedades.labels.tipo}
          </InputLabel>
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="tipo-label"
                label={v.entities.variedades.labels.tipo}
              >
                <MenuItem value="remontante">
                  {v.entities.variedades.tipos.remontante}
                </MenuItem>
                <MenuItem value="no_remontante">
                  {v.entities.variedades.tipos.no_remontante}
                </MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{getError("tipo")}</FormHelperText>
        </FormControl>
      </Box>

      {/* Fila 2: Descripción */}
      <Box>
        <TextField
          label={v.entities.variedades.labels.descripcion}
          multiline
          rows={3}
          fullWidth
          error={!!getError("descripcion")}
          helperText={getError("descripcion")}
          {...register("descripcion")}
        />
      </Box>
    </Box>
  );
}
