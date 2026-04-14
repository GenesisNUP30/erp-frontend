import { useState } from "react";
import { createParcelaRequest } from "../services/parcelaService";
import { mapParcelaFormToCreateDTO } from "../mappers/parcela.mappers";
import type { ParcelaFormData } from "../schema/parcelaSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateParcela(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createParcela = async (formData: ParcelaFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createParcelaRequest(mapParcelaFormToCreateDTO(formData));

      // Notificación de éxito
      postNotification("Parcela creada con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación: revisa los datos", "error");
      } else {
        console.error("Error de servidor:", error.message);
        postNotification(error.message || "Error al crear parcela", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createParcela, loading, serverErrors };
}
