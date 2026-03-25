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
import type { Control,UseFormRegister, FieldErrors } from "react-hook-form";
import type { WorkerFormData } from "../../schema/workerSchema";
import v from "../../../../validations/validations";
import dayjs from "dayjs";

interface Props {
  register: UseFormRegister<WorkerFormData>;
  errors: FieldErrors<WorkerFormData>;
  control: Control<WorkerFormData>;
  serverErrors?: Record<string, string[]> | null;
}

export default function WorkerFields({ register, errors, control, serverErrors }: Props) {
  // Acceso directo a los labels para limpiar el JSX
  const l = v.entities.workers.labels;

  // Función auxiliar para obtener el mensaje de error 
  const getError = (fieldName: keyof WorkerFormData) => {
    // Error de Zod 
    if (errors[fieldName]) return errors[fieldName]?.message;
    // Error de Back
    if (serverErrors && serverErrors[fieldName]) return serverErrors[fieldName][0];
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
          <FormControl error={!!getError('name')} sx={{ flex: '1 1 300px' }}>
            <InputLabel htmlFor="name">{l.name}</InputLabel>
            <OutlinedInput id="name" label={l.name} {...register('name')} />
            <FormHelperText>{getError('name')}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError('username')} sx={{ flex: '1 1 200px' }}>
            <InputLabel htmlFor="username">{l.username}</InputLabel>
            <OutlinedInput id="username" label={l.username} {...register('username')} />
            <FormHelperText>{getError('username')}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 2: DNI y Rol */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError('dni')} sx={{ flex: "1 1 200px" }}>
            <InputLabel htmlFor="dni">{l.dni}</InputLabel>
            <OutlinedInput id="dni" label={l.dni} {...register('dni')} />
            <FormHelperText>{getError('dni')}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError('rol')} sx={{ flex: '1 1 200px' }}>
            <InputLabel id='rol-label'>{l.rol}</InputLabel>
            <Select labelId="rol-label" id="rol" defaultValue='' label={l.rol} {...register('rol')}>
              <MenuItem value="recolector">Recolector</MenuItem>
              <MenuItem value="encargado">Encargado</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
            </Select>
            <FormHelperText>{getError('rol')}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 3: Email y Teléfono */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError('email')} sx={{ flex: "1 1 300px" }}>
            <InputLabel htmlFor="email">{l.email}</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label={l.email}
              {...register("email")}
            />
            <FormHelperText>{getError('email')}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError('telefono')} sx={{ flex: "1 1 200px" }}>
            <InputLabel htmlFor="telefono">{l.telefono}</InputLabel>
            <OutlinedInput
              id="telefono"
              label={l.telefono}
              {...register("telefono")}
            />
            <FormHelperText>{getError('telefono')}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 4: Fecha Alta y Password (si fuera necesario) */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError('fecha_alta')} sx={{ flex: "1 1 200px" }}>
            <Controller
              name="fecha_alta"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={l.fecha_alta}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : "");
                  }}
                  slotProps={{
                    textField: {
                      error: !!getError('fecha_alta'),
                    },
                  }}
                />
              )}
            />
            <FormHelperText>{getError('fecha_alta')}</FormHelperText>
          </FormControl>

          <FormControl error={!!getError('password')} sx={{ flex: '1 1 200px' }}>
            <InputLabel htmlFor="password">{l.password}</InputLabel>
            <OutlinedInput id="password" type="password" label={l.password} {...register('password')} />
            <FormHelperText>{getError('password')}</FormHelperText>
          </FormControl>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
