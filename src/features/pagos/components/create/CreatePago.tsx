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
import { createPagoSchema } from "../../schema/pagoSchema";
import type { PagoFormData } from "../../schema/pagoSchema";
import useCreatePago from "../../hooks/useCreatePago";
import PagoFields from "./PagoFields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreatePago({ open, onClose, onSuccess }: Props) {
  const { createPago, loading, serverErrors } = useCreatePago(() => {
    reset();
    onSuccess();
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PagoFormData>({
    resolver: zodResolver(createPagoSchema) as any,
    defaultValues: {
      user_id: 0,
      mes: new Date().getMonth() + 1,
      anio: new Date().getFullYear(),
      total_horas: 0,
      monto_total: 0,
      estado: "borrador",
      fecha_pago: null,
    },
  });

  const onSubmit = async (data: PagoFormData) => {
    try {
      await createPago(data);
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
        <Typography>Crear pago</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" noValidate>
          <PagoFields
            register={register}
            errors={errors}
            control={control as any}
            setValue={setValue}
            watch={watch}
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
          {loading ? "Guardando..." : "Crear pago"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
