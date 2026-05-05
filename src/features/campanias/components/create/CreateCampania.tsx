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
import { createCampaniaSchema } from "../../schema/campaniaSchema";
import type { CampaniaFormData } from "../../schema/campaniaSchema";
import useCreateCampania from "../../hooks/useCreateCampania";
import CampaniaFields from "./CampaniaFields";
import v from "../../../../validations/validations";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCampania({ open, onClose, onSuccess }: Props) {
  const { createCampania, loading, serverErrors } = useCreateCampania(() => {
    reset();
    onSuccess();
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CampaniaFormData>({
    resolver: zodResolver(createCampaniaSchema) as any,
    defaultValues: {
      nombre: "",
      fecha_inicio: "",
      fecha_fin: null,
      descripcion: "",
      estado: "activa",
    },
  });

  const onSubmit = async (data: CampaniaFormData) => {
    try {
      await createCampania(data);
    } catch (error) {
      console.error("Error en CreateCampania:", error);
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
          {v.createForm.title.replace("{item}", v.entities.campanias.singular)}
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
          <CampaniaFields
            register={register}
            errors={errors}
            control={control as any}
            setValue={setValue}
            serverErrors={serverErrors}
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
