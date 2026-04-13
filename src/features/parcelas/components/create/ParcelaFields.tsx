import { Box, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import type { ParcelaFormData } from "../../schema/parcelaSchema";
import v from "../../../../validations/validations";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<ParcelaFormData>;
  serverErrors?: Record<string, string[]> | null;
}

export default function ParcelaFields({ register, errors, control, serverErrors }: Props) {
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

      {/* Fila 1: Nombre y Superficie */}
      <Box display="flex" gap={2} flexWrap="wrap">
        <FormControl error={!!getError("nombre")} sx={{ flex: "1 1 300px" }}>
          <InputLabel htmlFor="nombre">{v.entities.parcelas.labels.nombre}</InputLabel>
          <OutlinedInput id="nombre" label={v.entities.parcelas.labels.nombre} {...register("nombre")} />
          <FormHelperText>{getError("nombre")}</FormHelperText>
        </FormControl>

        <FormControl error={!!getError("superficie_hectareas")} sx={{ flex: "1 1 200px" }}>
          <InputLabel htmlFor="superficie_hectareas">{v.entities.parcelas.labels.superficie_hectareas}</InputLabel>
          <OutlinedInput
            id="superficie_hectareas"
            label={v.entities.parcelas.labels.superficie_hectareas}
            type="number"
            inputProps={{ min: 0, step: "0.01" }}
            {...register("superficie_hectareas")}
          />
          <FormHelperText>{getError("superficie_hectareas")}</FormHelperText>
        </FormControl>
      </Box>

      {/* Fila 2: Ubicación */}
      <Box display="flex" gap={2} flexWrap="wrap">
        <FormControl error={!!getError("ubicacion")} sx={{ flex: "1 1 300px" }}>
          <InputLabel htmlFor="ubicacion">{v.entities.parcelas.labels.ubicacion}</InputLabel>
          <OutlinedInput id="ubicacion" label={v.entities.parcelas.labels.ubicacion} {...register("ubicacion")} />
          <FormHelperText>{getError("ubicacion")}</FormHelperText>
        </FormControl>

        <FormControl error={!!getError("estado")} sx={{ flex: "1 1 200px" }}>
          <InputLabel id="estado-label">{v.entities.parcelas.labels.estado}</InputLabel>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="estado-label" label={v.entities.parcelas.labels.estado}>
                <MenuItem value="activa">Activa</MenuItem>
                <MenuItem value="inactiva">Inactiva</MenuItem>
                <MenuItem value="en_mantenimiento">En mantenimiento</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{getError("estado")}</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}