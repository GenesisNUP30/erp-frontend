import { useState } from "react";
import { deleteVariedadRequest } from "../services/variedadService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteVariedad(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deleteVariedad = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteVariedadRequest(id);
      
      postNotification(response.message || 'Variedad eliminada con éxito', 'success')
      onSuccess();
    } catch (error) {
      console.error("Error eliminando variedad:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteVariedad, loading };
}