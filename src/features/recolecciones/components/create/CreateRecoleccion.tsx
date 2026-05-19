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
import { createRecoleccionSchema } from "../../schema/recoleccionSchema";
import type { RecoleccionFormData } from "../../schema/recoleccionSchema";
import useCreateRecoleccion from "../../hooks/useCreateRecoleccion";
import RecoleccionFields from "./RecoleccionFields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateRecoleccion({ open, onClose, onSuccess }: Props) {
  const { createRecoleccion, loading, serverErrors } = useCreateRecoleccion(
    () => {
      reset();
      onSuccess();
    },
  );
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RecoleccionFormData>({
    resolver: zodResolver(createRecoleccionSchema) as any,
    defaultValues: {
      cosecha_id: 0,
      user_id: null,
      fecha: "",
      num_cajas: 1,
      kilos_caja: 2.5,
      notas: "",
      estado: "registrada",
    },
  });

  const onSubmit = async (data: RecoleccionFormData) => {
    try {
      await createRecoleccion(data);
    } catch {}
  };
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Registrar recolección</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <RecoleccionFields
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
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit(onSubmit as any)}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Registrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
