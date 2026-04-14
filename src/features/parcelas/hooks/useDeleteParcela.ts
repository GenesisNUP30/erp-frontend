import { useState } from "react";
import { deleteParcelaRequest } from "../services/parcelaService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteParcela(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deleteParcela = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteParcelaRequest(id);

      // Notificación de éxito
      postNotification(response.message || "Parcela eliminada", "success");
      onSuccess();
    } catch (error) {
      console.error("Error eliminando parcela:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteParcela, loading };
}
