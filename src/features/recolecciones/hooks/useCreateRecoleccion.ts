import { useState } from "react";
import { createRecoleccionRequest } from "../services/recoleccionService";
import { mapRecoleccionFormToDTO } from "../mappers/recoleccion.mappers";
import type { RecoleccionFormData } from "../schema/recoleccionSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateRecoleccion(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createRecoleccion = async (formData: RecoleccionFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createRecoleccionRequest(mapRecoleccionFormToDTO(formData));
      postNotification("Recolección registrada con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación", "error");
      } else {
        postNotification(
          error.message || "Error al registrar la recolección",
          "error",
        );
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createRecoleccion, loading, serverErrors };
}
