import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
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
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getCosechasActivasRequest } from "../../../cosechas/services/cosechaService";
import type { CosechaSelectOption } from "../../../cosechas/types/ICosechas";
import { getWorkersRequest } from "../../../workers/services/workerService";
import type { Worker } from "../../../workers/types/IWorkers";

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  serverErrors?: Record<string, string[]> | null;
}

export default function HorasFields({
  register,
  errors,
  control,
  serverErrors,
}: Props) {
  const [cosechas, setCosechas] = useState<CosechaSelectOption[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);

  useEffect(() => {
    getCosechasActivasRequest().then(setCosechas).catch(console.error);
    getWorkersRequest(1, 100)
      .then(({ data }) => setWorkers(data))
      .catch(console.error);
  }, []);

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

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("user_id")} sx={{ flex: "1 1 250px" }}>
            <InputLabel>Trabajador</InputLabel>
            <Controller
              name="user_id"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Trabajador">
                  {workers.map((w) => (
                    <MenuItem key={w.id} value={w.id}>
                      {w.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{getError("user_id")}</FormHelperText>
          </FormControl>

          <FormControl sx={{ flex: "1 1 250px" }}>
            <InputLabel>Cosecha (opcional)</InputLabel>
            <Controller
              name="cosecha_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Cosecha (opcional)"
                  value={field.value ?? ""}
                >
                  <MenuItem value="">Sin cosecha</MenuItem>
                  {cosechas.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.nombre_cosecha}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl error={!!getError("fecha")} sx={{ flex: "1 1 200px" }}>
            <Controller
              name="fecha"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Fecha"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(d) =>
                    field.onChange(d ? d.format("YYYY-MM-DD") : "")
                  }
                  slotProps={{ textField: { error: !!getError("fecha") } }}
                />
              )}
            />
            <FormHelperText>{getError("fecha")}</FormHelperText>
          </FormControl>

          <TextField
            label="Tipo de trabajo"
            sx={{ flex: "1 1 200px" }}
            error={!!getError("tipo_trabajo")}
            helperText={getError("tipo_trabajo")}
            {...register("tipo_trabajo")}
          />
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Horas"
            type="number"
            inputProps={{ step: "0.25" }}
            sx={{ flex: "1 1 120px" }}
            error={!!getError("horas")}
            helperText={getError("horas")}
            {...register("horas", { valueAsNumber: true })}
          />
          <TextField
            label="Precio/hora (€)"
            type="number"
            inputProps={{ step: "0.01" }}
            sx={{ flex: "1 1 120px" }}
            error={!!getError("precio_hora")}
            helperText={getError("precio_hora")}
            {...register("precio_hora", { valueAsNumber: true })}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
