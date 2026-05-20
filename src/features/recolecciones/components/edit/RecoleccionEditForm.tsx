import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateRecoleccionSchema } from "../../schema/recoleccionSchema";
import type { RecoleccionFormData } from "../../schema/recoleccionSchema";
import type { Recoleccion } from "../../types/IRecolecciones";
import RecoleccionFields from "../create/RecoleccionFields";

interface Props {
  initialData: Recoleccion;
  onSubmit: (data: RecoleccionFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function RecoleccionEditForm({
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
  } = useForm<RecoleccionFormData>({
    resolver: zodResolver(updateRecoleccionSchema) as any,
    defaultValues: {
      cosecha_id: initialData.cosecha_id,
      user_id: initialData.user_id,
      fecha: initialData.fecha,
      num_cajas: initialData.num_cajas,
      kilos_caja: initialData.kilos_caja,
      notas: initialData.notas || "",
      estado: initialData.estado,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <RecoleccionFields
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
