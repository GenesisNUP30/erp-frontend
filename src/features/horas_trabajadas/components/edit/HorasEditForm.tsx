import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateHorasSchema } from "../../schema/horasTrabajadaSchema";
import type { HorasFormData } from "../../schema/horasTrabajadaSchema";
import type { HorasTrabajada } from "../../types/IHorasTrabajadas";
import HorasFields from "../create/HorasFields";

interface Props {
  initialData: HorasTrabajada;
  onSubmit: (data: HorasFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function HorasEditForm({
  initialData,
  onSubmit,
  loading,
  serverErrors,
}: Props) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isDirty },
  } = useForm<HorasFormData>({
    resolver: zodResolver(updateHorasSchema) as any,
    defaultValues: {
      user_id: initialData.user_id ?? 0,
      cosecha_id: initialData.cosecha_id,
      fecha: initialData.fecha,
      horas: initialData.horas,
      precio_hora: initialData.precio_hora,
      tipo_trabajo: initialData.tipo_trabajo,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <HorasFields
          control={control as any}
          errors={errors}
          register={register}
          setValue={setValue}
          serverErrors={serverErrors}
        />
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !isDirty}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
