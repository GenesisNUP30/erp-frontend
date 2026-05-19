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
import { createHorasSchema } from "../../schema/horasTrabajadaSchema";
import type { HorasFormData } from "../../schema/horasTrabajadaSchema";
import useCreateHoras from "../../hooks/useCreateHoras";
import HorasFields from "./HorasFields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateHoras({ open, onClose, onSuccess }: Props) {
  const { createHoras, loading, serverErrors } = useCreateHoras(() => {
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
  } = useForm<HorasFormData>({
    resolver: zodResolver(createHorasSchema) as any,
    defaultValues: {
      user_id: 0,
      cosecha_id: null,
      fecha: "",
      horas: 8,
      precio_hora: 0,
      tipo_trabajo: "",
    },
  });

  const onSubmit = async (data: HorasFormData) => {
    try {
      await createHoras(data);
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
        <Typography>Registrar horas trabajadas</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <HorasFields
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
