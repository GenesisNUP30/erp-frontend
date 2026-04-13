import { useState } from "react";
import { createWorkerRequest } from "../services/workerService";
import type { WorkerFormData } from "../schema/workerSchema";
import { mapWorkerFormToCreateDTO } from "../mappers/worker.mappers";

export default function useCreateWorker(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const createWorker = async (formData: WorkerFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);

      const payload = mapWorkerFormToCreateDTO(formData);

      const response = await createWorkerRequest(payload);

      onSuccess();

      return response;
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors); // Guardamos los errores de validación de Laravel
      } else {
        console.error("Error de servidor:", error.message);
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
