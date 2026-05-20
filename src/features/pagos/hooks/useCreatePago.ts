import { useState } from "react";
import { createPagoRequest } from "../services/pagoService";
import { mapPagoFormToDTO } from "../mappers/pago.mappers";
import type { PagoFormData } from "../schema/pagoSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreatePago(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createPago = async (formData: PagoFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createPagoRequest(mapPagoFormToDTO(formData));
      postNotification("Pago creado con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación", "error");
      } else {
        postNotification(error.message || "Error al crear el pago", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createPago, loading, serverErrors };
}
