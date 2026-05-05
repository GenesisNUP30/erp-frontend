import { Box, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCampaniaSchema } from "../../schema/campaniaSchema";
import type { CampaniaFormData } from "../../schema/campaniaSchema";
import type { Campania } from "../../types/ICampanias";
import CampaniaFields from "../create/CampaniaFields";

interface Props {
  initialData: Campania;
  onSubmit: (data: CampaniaFormData) => void;
  loading: boolean;
  serverErrors?: Record<string, string[]> | null;
}

export default function CampaniaEditForm({ initialData, onSubmit, loading, serverErrors }: Props) {
  const { control, handleSubmit, register, setValue, formState: { errors, isDirty } } = useForm<CampaniaFormData>({
    resolver: zodResolver(updateCampaniaSchema) as any,
    defaultValues: {
      nombre: initialData.nombre,
      fecha_inicio: initialData.fecha_inicio,
      fecha_fin: initialData.fecha_fin,
      descripcion: initialData.descripcion || '',
      estado: initialData.estado,
    },
  });

  return (
    <Paper sx={{ p: 3, borderRadius: '12px' }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CampaniaFields control={control as any} errors={errors} register={register} setValue={setValue} serverErrors={serverErrors} />
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button variant="contained" type="submit" disabled={loading || !isDirty}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}