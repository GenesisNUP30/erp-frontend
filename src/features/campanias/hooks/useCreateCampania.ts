import { useState } from "react";
import { createCampaniaRequest } from "../services/campaniaService";
import { mapCampaniaFormToCreateDTO } from "../mappers/campania.mappers";
import type { CampaniaFormData } from "../schema/campaniaSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateCampania(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);
  const { postNotification } = useNotificationStore();

  const createCampania = async (formData: CampaniaFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);

      await createCampaniaRequest(mapCampaniaFormToCreateDTO(formData));
      // Notificación de éxito
      postNotification("Campaña creada con éxito", "success");
      
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) setServerErrors(error.errors);
      else {
        console.error("Error de servidor:", error.message);
        postNotification("Error al crear la campaña", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createCampania, loading, serverErrors };
}