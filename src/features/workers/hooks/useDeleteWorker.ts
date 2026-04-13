import { useState } from "react";
import { deleteWorkerRequest } from "../services/workerService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteWorker(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();


  const deleteWorker = async (id: number) => {
    try {
      setLoading(true);

      const response = await deleteWorkerRequest(id);
      // Notificación de éxito
      postNotification(response.message || 'Trabajador eliminado', 'success')
      onSuccess();
      return response;
      
    } catch (error) {
      console.error("Error eliminando trabajador:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteWorker,
    loading,
  };
}
