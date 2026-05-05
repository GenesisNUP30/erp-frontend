import { useState } from "react";
import { deleteCampaniaRequest } from "../services/campaniaService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteCampania(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deleteCampania = async (id: number) => {
    try {
      setLoading(true);

      const response = await deleteCampaniaRequest(id);
      // Notificación de éxito
      postNotification(response.message || 'Campaña eliminada', 'success')
      onSuccess();
      return response;
      
    } catch (error) {
      console.error("Error eliminando campaña:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCampania,
    loading,
  };
}