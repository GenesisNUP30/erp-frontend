import { useState } from "react";
import { createHorasRequest } from "../services/horasTrabajadaService";
import { mapHorasFormToDTO } from "../mappers/horas.mappers";
import type { HorasFormData } from "../schema/horasTrabajadaSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useCreateHoras(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  const createHoras = async (formData: HorasFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createHorasRequest(mapHorasFormToDTO(formData));
      postNotification("Horas registradas con éxito", "success");
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) {
        setServerErrors(error.errors);
        postNotification("Error de validación", "error");
      } else {
        postNotification(error.message || "Error al registrar horas", "error");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createHoras, loading, serverErrors };
}
