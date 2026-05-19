import { useState } from "react";
import { deleteRecoleccionRequest } from "../services/recoleccionService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteRecoleccion(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deleteRecoleccion = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteRecoleccionRequest(id);
      postNotification(response.message || "Recolección eliminada", "success");
      onSuccess();
    } catch (error: any) {
      postNotification(error.message || "Error al eliminar", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecoleccion, loading };
}
