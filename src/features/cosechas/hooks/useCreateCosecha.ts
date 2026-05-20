import { useState } from "react";
import { createCosechaRequest } from "../services/cosechaService";
import { mapCosechaFormToDTO } from "../mappers/cosecha.mappers";
import type { CosechaFormData } from "../schema/cosechaSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateCosecha(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createCosecha = async (formData: CosechaFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createCosechaRequest(mapCosechaFormToDTO(formData));
      postNotification("Cosecha creada con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación: revisa los datos", "error");
      } else {
        postNotification(error.message || "Error al crear la cosecha", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createCosecha, loading, serverErrors };
}
