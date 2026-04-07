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
import { Controller } from "react-hook-form";
import type { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import type { WorkerFormData } from "../../schema/workerSchema";
import v from "../../../../validations/validations";
import dayjs from "dayjs";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<WorkerFormData>;
  serverErrors?: Record<string, string[]> | null;
  canEditRol?: boolean;
}

export default function WorkerFields({
  register,
  errors,
  control,
  serverErrors,
  canEditRol = true,
}: Props) {
  // Función auxiliar para obtener el mensaje de error
  const getError = (fieldName: string) => {
    // Cambia el tipo a string para ser más flexible
    // Prioridad: Error de Zod (Frontend)
    if (errors[fieldName as keyof FieldErrors<WorkerFormData>]) {
      return errors[fieldName as keyof FieldErrors<WorkerFormData>]
        ?.message as string;
    }

    // Segunda opción: Error de Laravel (Backend)
    if (serverErrors && serverErrors[fieldName]) {
      return serverErrors[fieldName][0];
    }

    return null;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Typography variant="subtitle2" color="text.secondary">
          {v.createForm.subtitle}
        </Typography>

        {/* Fila 1: Nombre y Usuario */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("name")} sx={{ flex: "1 1 300px" }}>
            <InputLabel htmlFor="name">
              {v.entities.workers.labels.name}
            </InputLabel>
            <OutlinedInput
              id="name"
              label={v.entities.workers.labels.name}
              {...register("name")}
            />
            <FormHelperText>{getError("name")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("username")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel htmlFor="username">
              {v.entities.workers.labels.username}
            </InputLabel>
            <OutlinedInput
              id="username"
              label={v.entities.workers.labels.username}
              {...register("username")}
            />
            <FormHelperText>{getError("username")}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 2: DNI y Rol */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("dni")} sx={{ flex: "1 1 200px" }}>
            <InputLabel htmlFor="dni">
              {v.entities.workers.labels.dni}
            </InputLabel>
            <OutlinedInput
              id="dni"
              label={v.entities.workers.labels.dni}
              {...register("dni")}
            />
            <FormHelperText>{getError("dni")}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError("rol")} sx={{ flex: "1 1 200px" }}>
            <InputLabel id="rol-label">
              {v.entities.workers.labels.rol}
            </InputLabel>
            <Controller
              name="rol"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="rol-label"
                  id="rol"
                  label={v.entities.workers.labels.rol}
                  disabled={!canEditRol}
                >
                  <MenuItem value="recolector">Recolector</MenuItem>
                  <MenuItem value="encargado">Encargado</MenuItem>
                  <MenuItem value="administrador">Administrador</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{getError("rol")}</FormHelperText>
            {!canEditRol && (
              <FormHelperText>
                Solo los administradores pueden cambiar el rol.
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* Fila 3: Email y Teléfono */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("email")} sx={{ flex: "1 1 300px" }}>
            <InputLabel htmlFor="email">
              {v.entities.workers.labels.email}
            </InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label={v.entities.workers.labels.email}
              {...register("email")}
            />
            <FormHelperText>{getError("email")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("telefono")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel htmlFor="telefono">
              {v.entities.workers.labels.telefono}
            </InputLabel>
            <OutlinedInput
              id="telefono"
              label={v.entities.workers.labels.telefono}
              {...register("telefono")}
            />
            <FormHelperText>{getError("telefono")}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 4: Fecha Alta y Password (si fuera necesario) */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            error={!!getError("fecha_alta")}
            sx={{ flex: "1 1 200px" }}
          >
            <Controller
              name="fecha_alta"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={v.entities.workers.labels.fecha_alta}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : "");
                  }}
                  slotProps={{
                    textField: {
                      error: !!getError("fecha_alta"),
                    },
                  }}
                />
              )}
            />
            <FormHelperText>{getError("fecha_alta")}</FormHelperText>
          </FormControl>

          <FormControl
            error={!!getError("password")}
            sx={{ flex: "1 1 200px" }}
          >
            <InputLabel htmlFor="password">
              {v.entities.workers.labels.password}
            </InputLabel>
            <OutlinedInput
              id="password"
              type="password"
              label={v.entities.workers.labels.password}
              {...register("password")}
            />
            <FormHelperText>{getError("password")}</FormHelperText>
          </FormControl>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
