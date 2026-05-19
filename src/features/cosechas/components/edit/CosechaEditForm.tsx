import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCosechaSchema } from "../../schema/cosechaSchema";
import type { CosechaFormData } from "../../schema/cosechaSchema";
import type { Cosecha } from "../../types/ICosechas";
import CosechaFields from "../create/CosechaFields";

interface Props {
  initialData: Cosecha;
  onSubmit: (data: CosechaFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function CosechaEditForm({
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
  } = useForm<CosechaFormData>({
    resolver: zodResolver(updateCosechaSchema) as any,
    defaultValues: {
      plantacion_id: initialData.plantacion_id,
      campania_id: initialData.campania_id,
      nombre_cosecha: initialData.nombre_cosecha,
      fecha_inicio: initialData.fecha_inicio,
      fecha_fin: initialData.fecha_fin,
      estado: initialData.estado,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CosechaFields
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
