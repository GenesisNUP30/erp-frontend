import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePagoSchema } from "../../schema/pagoSchema";
import type { PagoFormData } from "../../schema/pagoSchema";
import type { Pago } from "../../types/IPagos";
import PagoFields from "../create/PagoFields";

interface Props {
  initialData: Pago;
  onSubmit: (data: PagoFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function PagoEditForm({
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
    watch,
    formState: { errors, isDirty },
  } = useForm<PagoFormData>({
    resolver: zodResolver(updatePagoSchema) as any,
    defaultValues: {
      user_id: initialData.user_id ?? 0,
      mes: initialData.mes,
      anio: initialData.anio,
      total_horas: initialData.total_horas,
      monto_total: initialData.monto_total,
      estado: initialData.estado,
      fecha_pago: initialData.fecha_pago,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <PagoFields
          control={control as any}
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
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
