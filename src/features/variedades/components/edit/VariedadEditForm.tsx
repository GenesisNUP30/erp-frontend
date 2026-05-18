import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateVariedadSchema } from "../../schema/variedadSchema";
import type { VariedadFormData } from "../../schema/variedadSchema";
import type { Variedad } from "../../types/IVariedades";
import VariedadFields from "../create/VariedadFields";

interface Props {
  initialData: Variedad;
  onSubmit: (data: VariedadFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function VariedadEditForm({
  initialData,
  onSubmit,
  loading,
  serverErrors,
}: Props) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<VariedadFormData>({
    resolver: zodResolver(updateVariedadSchema) as any,
    defaultValues: {
      nombre: initialData.nombre,
      tipo: initialData.tipo,
      descripcion: initialData.descripcion || "",
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <VariedadFields
          control={control as any}
          errors={errors}
          register={register}
          serverErrors={serverErrors}
        />
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            type="submit"
            disabled={loading || !isDirty}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
