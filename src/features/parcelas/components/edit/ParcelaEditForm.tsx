import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateParcelaSchema } from "../../schema/parcelaSchema";
import type { ParcelaFormData } from "../../schema/parcelaSchema";
import type { Parcela } from "../../types/IParcelas";
import ParcelaFields from "../create/ParcelaFields";

interface Props {
  initialData: Parcela;
  onSubmit: (data: ParcelaFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function ParcelaEditForm({
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
  } = useForm<ParcelaFormData>({
    resolver: zodResolver(updateParcelaSchema) as any,
    defaultValues: {
      nombre: initialData.nombre,
      superficie_hectareas: String(initialData.superficie_hectareas),
      ubicacion: initialData.ubicacion,
      estado: initialData.estado,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <ParcelaFields
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
