import { useState } from "react";
import { createWorkerRequest } from "../services/workerService";
import type { WorkerFormData } from "../schema/workerSchema";
import { mapWorkerFormToCreateDTO } from "../mappers/worker.mappers";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateWorker(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createWorker = async (formData: WorkerFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);

      const payload = mapWorkerFormToCreateDTO(formData);
      const response = await createWorkerRequest(payload);

      // Notificación de éxito
      postNotification("Trabajador creado con éxito", "success");

      onSuccess();

      return response;
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors); // Guardamos los errores de validación de Laravel
        postNotification("Error de validación: revisa los datos", "error");
      } else {
        console.error("Error de servidor:", error.message);
        postNotification(error.message || "No se pudo crear el trabajador", "error");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createWorker,
    loading,
    serverErrors,
  };
}
