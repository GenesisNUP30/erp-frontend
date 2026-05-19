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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import type { CosechaFormData } from "../../schema/cosechaSchema";
import dayjs from "dayjs";
import useSelectOptions from "../../../plantaciones/hooks/useSelectOptions";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<CosechaFormData>;
  setValue: UseFormSetValue<any>;
  serverErrors?: Record<string, string[]> | null;
}

export default function CosechaFields({
  register,
  errors,
  control,
  serverErrors,
}: Props) {
  const { parcelas, campanias, loading } = useSelectOptions();

  const getError = (f: string) => {
    if (errors[f]?.message) return errors[f]?.message as string;
    if (serverErrors?.[f]) return serverErrors[f][0];
    return null;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Typography variant="subtitle2" color="text.secondary">
          Información básica
        </Typography>

        <FormControl error={!!getError("nombre_cosecha")} fullWidth>
          <InputLabel>Nombre de la cosecha</InputLabel>
          <OutlinedInput
            label="Nombre de la cosecha"
            {...register("nombre_cosecha")}
          />
          <FormHelperText>{getError("nombre_cosecha")}</FormHelperText>
        </FormControl>

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            error={!!getError("plantacion_id")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel>Plantación (parcela)</InputLabel>
            <Controller
              name="plantacion_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Plantación (parcela)"
                  disabled={loading}
                >
                  {parcelas.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.nombre}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{getError("plantacion_id")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("campania_id")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel>Campaña</InputLabel>
            <Controller
              name="campania_id"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Campaña" disabled={loading}>
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

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            error={!!getError("fecha_inicio")}
            sx={{ flex: "1 1 200px" }}
          >
            <Controller
              name="fecha_inicio"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Fecha inicio"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(d) =>
                    field.onChange(d ? d.format("YYYY-MM-DD") : "")
                  }
                  slotProps={{
                    textField: { error: !!getError("fecha_inicio") },
                  }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_inicio")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("fecha_fin")}
            sx={{ flex: "1 1 200px" }}
          >
            <Controller
              name="fecha_fin"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Fecha fin (opcional)"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(d) =>
                    field.onChange(d ? d.format("YYYY-MM-DD") : null)
                  }
                  slotProps={{ textField: { error: !!getError("fecha_fin") } }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_fin")}</FormHelperText>
          </FormControl>
        </Box>

        <FormControl error={!!getError("estado")} sx={{ maxWidth: 300 }}>
          <InputLabel>Estado</InputLabel>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Estado">
                <MenuItem value="en_crecimiento">En crecimiento</MenuItem>
                <MenuItem value="en_recoleccion">En recolección</MenuItem>
                <MenuItem value="en_poda">En poda</MenuItem>
                <MenuItem value="finalizada">Finalizada</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{getError("estado")}</FormHelperText>
        </FormControl>
      </Box>
    </LocalizationProvider>
  );
}
