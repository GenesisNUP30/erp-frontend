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
}

export default function WorkerFields({ register, errors, control }: Props) {
  // Acceso directo a los labels para limpiar el JSX
  const l = v.entities.workers.labels;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={3} mt={2}>
        <Typography variant="subtitle2" color="text.secondary">
          {v.createForm.subtitle}
        </Typography>

        {/* Fila 1: Nombre y Usuario */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!errors.name} sx={{ flex: '1 1 300px' }}>
            <InputLabel htmlFor="name">{l.name}</InputLabel>
            <OutlinedInput id="name" label={l.name} {...register('name')} />
            <FormHelperText>{errors.name?.message}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.username} sx={{ flex: '1 1 200px' }}>
            <InputLabel htmlFor="username">{l.username}</InputLabel>
            <OutlinedInput id="username" label={l.username} {...register('username')} />
            <FormHelperText>{errors.username?.message}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 2: DNI y Rol */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!errors.dni} sx={{ flex: "1 1 200px" }}>
            <InputLabel htmlFor="dni">{l.dni}</InputLabel>
            <OutlinedInput id="dni" label={l.dni} {...register('dni')} />
            <FormHelperText>{errors.dni?.message}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.rol} sx={{ flex: '1 1 200px' }}>
            <InputLabel id='rol-label'>{l.rol}</InputLabel>
            <Select labelId="rol-label" id="rol" defaultValue='' label={l.rol} {...register('rol')}>
              <MenuItem value="recolector">Recolector</MenuItem>
              <MenuItem value="encargado">Encargado</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
            </Select>
            <FormHelperText>{errors.rol?.message}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 3: Email y Teléfono */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!errors.email} sx={{ flex: "1 1 300px" }}>
            <InputLabel htmlFor="email">{l.email}</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              label={l.email}
              {...register("email")}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.telefono} sx={{ flex: "1 1 200px" }}>
            <InputLabel htmlFor="telefono">{l.telefono}</InputLabel>
            <OutlinedInput
              id="telefono"
              label={l.telefono}
              {...register("telefono")}
            />
            <FormHelperText>{errors.telefono?.message}</FormHelperText>
          </FormControl>
        </Box>

        {/* Fila 4: Fecha Alta y Password (si fuera necesario) */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!errors.fecha_alta} sx={{ flex: "1 1 200px" }}>
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
                      error: !!errors.fecha_alta,
                    },
                  }}
                />
              )}
            />
            <FormHelperText>{errors.fecha_alta?.message}</FormHelperText>
          </FormControl>

          <FormControl error={!!errors.password} sx={{ flex: '1 1 200px' }}>
            <InputLabel htmlFor="password">{l.password}</InputLabel>
            <OutlinedInput id="password" type="password" label={l.password} {...register('password')} />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
