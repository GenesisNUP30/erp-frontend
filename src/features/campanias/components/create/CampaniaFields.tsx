import { Box, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useWatch } from "react-hook-form";
import { useEffect } from "react";
import type { Control, UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import type { CampaniaFormData } from "../../schema/campaniaSchema";
import dayjs from "dayjs";
import v from "../../../../validations/validations";

interface Props {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    control: Control<CampaniaFormData>;
    setValue: UseFormSetValue<any>;
    serverErrors?: Record<string, string[]> | null;
}

export default function CampaniaFields({ register, errors, control, setValue, serverErrors }: Props) {
const estadoActual = useWatch({ control, name: "estado" });

  useEffect(() => {
    if (estadoActual === "activa") {
      setValue("fecha_fin", null);
    }
  }, [estadoActual, setValue]);

  const getError = (fieldName: string) => {
    if (errors[fieldName]?.message) return errors[fieldName]?.message as string;
    if (serverErrors?.[fieldName]) return serverErrors[fieldName][0];
    return null;
  };

  const fechaFinVisible = estadoActual === 'finalizada' || estadoActual === 'planificada';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Typography variant="subtitle2" color="text.secondary">
          {v.createForm.subtitle}
        </Typography>

        {/* Fila 1: Nombre y Estado */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("nombre")} sx={{ flex: "1 1 300px" }}>
            <InputLabel htmlFor="nombre">{v.entities.campanias.labels.nombre}</InputLabel>
            <OutlinedInput id="nombre" label={v.entities.campanias.labels.nombre} {...register("nombre")} />
            <FormHelperText>{getError("nombre")}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError("estado")} sx={{ flex: "1 1 200px" }}>
            <InputLabel id="estado-label">{v.entities.campanias.labels.estado}</InputLabel>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="estado-label" label={v.entities.campanias.labels.estado}>
                  <MenuItem value="activa">Activa</MenuItem>
                  <MenuItem value="finalizada">Finalizada</MenuItem>
                  <MenuItem value="planificada">Planificada</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{getError("estado")}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 2: Fecha inicio y Fecha fin */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("fecha_inicio")} sx={{ flex: "1 1 200px" }}>
            <Controller
              name="fecha_inicio"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={v.entities.campanias.labels.fecha_inicio}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : "")}
                  slotProps={{ textField: { error: !!getError("fecha_inicio") } }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_inicio")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("fecha_fin")}
            sx={{ flex: "1 1 200px", visibility: fechaFinVisible ? "visible" : "hidden" }}
          >
            <Controller
              name="fecha_fin"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={v.entities.campanias.labels.fecha_fin}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format("YYYY-MM-DD") : null)}
                  slotProps={{ textField: { error: !!getError("fecha_fin") } }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_fin")}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 3: Descripción */}
        <Box>
          <TextField
            label={v.entities.campanias.labels.descripcion}
            multiline
            rows={3}
            fullWidth
            error={!!getError("descripcion")}
            helperText={getError("descripcion")}
            {...register("descripcion")}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  )
}