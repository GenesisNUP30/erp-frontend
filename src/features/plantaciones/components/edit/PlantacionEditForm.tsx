import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePlantacionSchema } from "../../schema/plantacionSchema";
import type { PlantacionFormData } from "../../schema/plantacionSchema";
import type { Plantacion } from "../../types/IPlantaciones";
import PlantacionFields from "../create/PlantacionFields";
import useSelectOptionsEdit from "../../hooks/useSelectOptionsEdit";

interface Props {
  initialData: Plantacion;
  onSubmit: (data: PlantacionFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function PlantacionEditForm({
  initialData,
  onSubmit,
  loading,
  serverErrors,
}: Props) {
  const { parcelas, variedades, campanias } = useSelectOptionsEdit({
    parcelaId: initialData.parcela_id,
    variedadId: initialData.variedad_id,
    campaniaId: initialData.campania_id,
  });

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PlantacionFormData>({
    resolver: zodResolver(updatePlantacionSchema) as any,
    defaultValues: {
      parcela_id: initialData.parcela_id,
      variedad_id: initialData.variedad_id,
      campania_id: initialData.campania_id,
      fecha_siembra: initialData.fecha_siembra,
      fecha_fin: initialData.fecha_fin,
      numero_plantas: initialData.numero_plantas,
      estado: initialData.estado,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: "12px" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <PlantacionFields
          control={control as any}
          errors={errors}
          register={register}
          setValue={setValue}
          serverErrors={serverErrors}
          parcelas={parcelas}
          variedades={variedades}
          campanias={campanias}
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
