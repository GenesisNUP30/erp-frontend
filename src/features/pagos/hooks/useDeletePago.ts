import { useState } from "react";
import { deletePagoRequest } from "../services/pagoService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeletePago(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deletePago = async (id: number) => {
    try {
      setLoading(true);
      const response = await deletePagoRequest(id);
      postNotification(response.message || "Pago eliminado", "success");
      onSuccess();
      return response;
    } catch (error: any) {
      postNotification(error.message || "Error al eliminar el pago", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deletePago, loading };
}
