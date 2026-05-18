import { useState } from "react";
import { createVariedadRequest } from "../services/variedadService";
import { mapVariedadFormToCreateDTO } from "../mappers/variedad.mappers";
import type { VariedadFormData } from "../schema/variedadSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateVariedad(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createVariedad = async (formData: VariedadFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);

      await createVariedadRequest(mapVariedadFormToCreateDTO(formData));

      postNotification("Variedad creada con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación: revisa los datos", "error");
      } else {
        console.error("Error de servidor:", error.message);
        postNotification(
          error.message || "No se pudo crear la variedad",
          "error",
        );
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createVariedad, loading, serverErrors };
}
