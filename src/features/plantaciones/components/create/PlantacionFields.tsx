import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, useWatch } from "react-hook-form";
import { useEffect } from "react";
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import type { PlantacionFormData } from "../../schema/plantacionSchema";
import type { SelectOption } from "../../types/IPlantaciones";
import dayjs from "dayjs";
import v from "../../../../validations/validations";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<PlantacionFormData>;
  setValue: UseFormSetValue<any>;
  serverErrors?: Record<string, string[]> | null;
  parcelas: SelectOption[];
  variedades: SelectOption[];
  campanias: SelectOption[];
}

export default function PlantacionFields({
  register,
  errors,
  control,
  setValue,
  serverErrors,
  parcelas,
  variedades,
  campanias,
}: Props) {
  const estadoActual = useWatch({ control, name: "estado" });

  useEffect(() => {
    if (estadoActual === "activa") setValue("fecha_fin", null);
  }, [estadoActual, setValue]);

  const getError = (fieldName: string) => {
    if (errors[fieldName]?.message) return errors[fieldName]?.message as string;
    if (serverErrors?.[fieldName]) return serverErrors[fieldName][0];
    return null;
  };

  const fechaFinVisible =
    estadoActual === "planificada" || estadoActual === "finalizada";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Typography variant="subtitle2" color="text.secondary">
          {v.createForm.subtitle}
        </Typography>

        {/* Fila 1: Parcela, Variedad, Campaña */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            error={!!getError("parcela_id")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel id="parcela-label">
              {v.entities.plantaciones.labels.parcela}
            </InputLabel>
            <Controller
              name="parcela_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="parcela-label"
                  label={v.entities.plantaciones.labels.parcela}
                >
                  {parcelas.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.nombre}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{getError("parcela_id")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("variedad_id")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel id="variedad-label">
              {v.entities.plantaciones.labels.variedad}
            </InputLabel>
            <Controller
              name="variedad_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="variedad-label"
                  label={v.entities.plantaciones.labels.variedad}
                >
                  {variedades.map((v) => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.nombre}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{getError("variedad_id")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("campania_id")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel id="campania-label">
              {v.entities.plantaciones.labels.campania}
            </InputLabel>
            <Controller
              name="campania_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="campania-label"
                  label={v.entities.plantaciones.labels.campania}
                >
                  {campanias.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.nombre}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{getError("campania_id")}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 2: Número de plantas y Estado */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            error={!!getError("numero_plantas")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel htmlFor="numero_plantas">
              {v.entities.plantaciones.labels.numero_plantas}
            </InputLabel>
            <OutlinedInput
              id="numero_plantas"
              type="number"
              label={v.entities.plantaciones.labels.numero_plantas}
              inputProps={{ min: 1 }}
              {...register("numero_plantas", { valueAsNumber: true })}
            />
            <FormHelperText>{getError("numero_plantas")}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError("estado")} sx={{ flex: "1 1 200px" }}>
            <InputLabel id="estado-label">
              {v.entities.plantaciones.labels.estado}
            </InputLabel>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="estado-label"
                  label={v.entities.plantaciones.labels.estado}
                >
                  <MenuItem value="planificada">Planificada</MenuItem>
                  <MenuItem value="activa">Activa</MenuItem>
                  <MenuItem value="finalizada">Finalizada</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{getError("estado")}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 3: Fecha siembra y Fecha fin */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            error={!!getError("fecha_siembra")}
            sx={{ flex: "1 1 200px" }}
          >
            <Controller
              name="fecha_siembra"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={v.entities.plantaciones.labels.fecha_siembra}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.format("YYYY-MM-DD") : "")
                  }
                  slotProps={{
                    textField: { error: !!getError("fecha_siembra") },
                  }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_siembra")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("fecha_fin")}
            sx={{
              flex: "1 1 200px",
              visibility: fechaFinVisible ? "visible" : "hidden",
            }}
          >
            <Controller
              name="fecha_fin"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={v.entities.plantaciones.labels.fecha_fin}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.format("YYYY-MM-DD") : null)
                  }
                  slotProps={{ textField: { error: !!getError("fecha_fin") } }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_fin")}</FormHelperText>
          </FormControl>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
