import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { getWorkersRequest } from "../../../workers/services/workerService";
import { generarBorradorRequest } from "../../services/pagoService";
import type { Worker } from "../../../workers/types/IWorkers";

const MESES = [
  { v: 1, l: "Enero" },
  { v: 2, l: "Febrero" },
  { v: 3, l: "Marzo" },
  { v: 4, l: "Abril" },
  { v: 5, l: "Mayo" },
  { v: 6, l: "Junio" },
  { v: 7, l: "Julio" },
  { v: 8, l: "Agosto" },
  { v: 9, l: "Septiembre" },
  { v: 10, l: "Octubre" },
  { v: 11, l: "Noviembre" },
  { v: 12, l: "Diciembre" },
];

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  serverErrors?: Record<string, string[]> | null;
}

export default function PagoFields({
  register,
  errors,
  control,
  setValue,
  watch,
  serverErrors,
}: Props) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loadingBorrador, setLoadingBorrador] = useState(false);
  const [borradorMsg, setBorradorMsg] = useState("");

  useEffect(() => {
    getWorkersRequest(1, 100)
      .then(({ data }) => setWorkers(data))
      .catch(console.error);
  }, []);

  const getError = (f: string) => {
    if (errors[f]?.message) return errors[f]?.message as string;
    if (serverErrors?.[f]) return serverErrors[f][0];
    return null;
  };

  const userId = watch("user_id");
  const mes = watch("mes");
  const anio = watch("anio");

  const handleGenerarBorrador = async () => {
    if (!userId || !mes || !anio) return;
    try {
      setLoadingBorrador(true);
      setBorradorMsg("");
      const borrador = await generarBorradorRequest(userId, mes, anio);
      setValue("total_horas", borrador.total_horas);
      setValue("monto_total", borrador.monto_total);
      setBorradorMsg(
        `Calculado: ${borrador.total_horas}h = ${Number(borrador.monto_total).toFixed(2)}€`,
      );
    } catch (error: any) {
      setBorradorMsg(
        error.message || "No hay horas sin pago para este período",
      );
    } finally {
      setLoadingBorrador(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} mt={2}>
      <Typography variant="subtitle2" color="text.secondary">
        Información del pago
      </Typography>

      <FormControl error={!!getError("user_id")} fullWidth>
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

      <Box display="flex" gap={2} flexWrap="wrap">
        <FormControl sx={{ flex: "1 1 150px" }}>
          <InputLabel>Mes</InputLabel>
          <Controller
            name="mes"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Mes">
                {MESES.map((m) => (
                  <MenuItem key={m.v} value={m.v}>
                    {m.l}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <TextField
          label="Año"
          type="number"
          sx={{ flex: "1 1 100px" }}
          {...register("anio", { valueAsNumber: true })}
        />
      </Box>

      <Button
        variant="outlined"
        onClick={handleGenerarBorrador}
        disabled={loadingBorrador || !userId}
      >
        {loadingBorrador ? "Calculando..." : "Calcular horas del período"}
      </Button>
      {borradorMsg && (
        <Typography
          variant="body2"
          color={borradorMsg.includes("€") ? "success.main" : "error.main"}
        >
          {borradorMsg}
        </Typography>
      )}

      <Box display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Total horas"
          type="number"
          inputProps={{ step: "0.25" }}
          sx={{ flex: "1 1 150px" }}
          error={!!getError("total_horas")}
          helperText={getError("total_horas")}
          {...register("total_horas", { valueAsNumber: true })}
        />
        <TextField
          label="Importe total (€)"
          type="number"
          inputProps={{ step: "0.01" }}
          sx={{ flex: "1 1 150px" }}
          error={!!getError("monto_total")}
          helperText={getError("monto_total")}
          {...register("monto_total", { valueAsNumber: true })}
        />
      </Box>

      <FormControl sx={{ maxWidth: 250 }}>
        <InputLabel>Estado</InputLabel>
        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Estado">
              <MenuItem value="borrador">Borrador</MenuItem>
              <MenuItem value="validado">Validado</MenuItem>
              <MenuItem value="pagado">Pagado</MenuItem>
              <MenuItem value="archivado">Archivado</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </Box>
  );
}
