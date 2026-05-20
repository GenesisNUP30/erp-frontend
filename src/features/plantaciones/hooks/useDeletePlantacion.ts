import { useState } from "react";
import { deletePlantacionRequest } from "../services/plantacionService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeletePlantacion(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deletePlantacion = async (id: number) => {
    try {
      setLoading(true);
      const response = await deletePlantacionRequest(id);
      // Notificación de éxito
      postNotification(response.message || "Plantación eliminada", "success");
      onSuccess();
      return response;
      
    } catch (error) {
      console.error("Error eliminando plantación:", error);
      postNotification("Error al eliminar la plantación", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deletePlantacion, loading };
}
