import { useState } from "react";
import { deleteHorasRequest } from "../services/horasTrabajadaService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteHoras(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deleteHoras = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteHorasRequest(id);
      postNotification(response.message || "Registro eliminado", "success");
      onSuccess();
      return response;
      
    } catch (error: any) {
      postNotification(error.message || "Error al eliminar", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteHoras, loading };
}
