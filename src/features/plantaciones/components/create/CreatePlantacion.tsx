import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPlantacionSchema } from "../../schema/plantacionSchema";
import type { PlantacionFormData } from "../../schema/plantacionSchema";
import useCreatePlantacion from "../../hooks/useCreatePlantacion";
import useSelectOptions from "../../hooks/useSelectOptions";
import PlantacionFields from "./PlantacionFields";
import v from "../../../../validations/validations";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatePlantacion({ open, onClose, onSuccess }: Props) {
  const { createPlantacion, loading, serverErrors } = useCreatePlantacion(
    () => {
      reset();
      onSuccess();
    },
  );
  const { parcelas, variedades, campanias } = useSelectOptions();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PlantacionFormData>({
    resolver: zodResolver(createPlantacionSchema) as any,
    defaultValues: {
      parcela_id: 0,
      variedad_id: 0,
      campania_id: 0,
      fecha_siembra: "",
      fecha_fin: null,
      numero_plantas: 1,
      estado: "activa",
    },
  });

  const onSubmit = async (data: PlantacionFormData) => {
    try {
      await createPlantacion(data);
    } catch (error) {
      console.error("Error en CreatePlantacion:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          {v.createForm.title.replace(
            "{item}",
            v.entities.plantaciones.singular,
          )}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <PlantacionFields
            register={register}
            errors={errors}
            control={control as any}
            setValue={setValue}
            serverErrors={serverErrors}
            parcelas={parcelas}
            variedades={variedades}
            campanias={campanias}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={loading}>
          {v.createForm.buttons.cancel}
        </Button>
        <Button
          onClick={handleSubmit(onSubmit as any)}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Guardando..." : v.createForm.buttons.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
