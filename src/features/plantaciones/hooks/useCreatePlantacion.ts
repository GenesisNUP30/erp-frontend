import { useState } from "react";
import { createPlantacionRequest } from "../services/plantacionService";
import type { PlantacionFormData } from "../schema/plantacionSchema";
import { mapPlantacionFormToCreateDTO } from "../mappers/plantaciones.mappers";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreatePlantacion(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const { postNotification } = useNotificationStore();

  const createPlantacion = async (formData: PlantacionFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createPlantacionRequest(mapPlantacionFormToCreateDTO(formData));
      postNotification("Plantación creada con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación: revisa los datos", "error");
      } else {
        console.error("Error de servidor:", error.message);
        postNotification(
          error.message || "Error al crear la plantación",
          "error",
        );
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createPlantacion, loading, serverErrors };
}
