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
import { createVariedadSchema } from "../../schema/variedadSchema";
import type { VariedadFormData } from "../../schema/variedadSchema";
import useCreateVariedad from "../../hooks/useCreateVariedad";
import VariedadFields from "./VariedadFields";
import v from "../../../../validations/validations";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateVariedad({ open, onClose, onSuccess }: Props) {
  const { createVariedad, loading, serverErrors } = useCreateVariedad(() => {
    reset();
    onSuccess();
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<VariedadFormData>({
    resolver: zodResolver(createVariedadSchema) as any,
    defaultValues: {
      nombre: "",
      tipo: "remontante",
      descripcion: "",
    },
  });

  const onSubmit = async (data: VariedadFormData) => {
    try {
      await createVariedad(data);
    } catch (error) {
      console.error("Error en CreateVariedad:", error);
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
          {v.createForm.title.replace("{item}", v.entities.variedades.singular)}
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
          <VariedadFields
            register={register}
            errors={errors}
            control={control as any}
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
