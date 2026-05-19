import { useState } from "react";
import { deleteCosechaRequest } from "../services/cosechaService";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useDeleteCosecha(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const { postNotification } = useNotificationStore();

  const deleteCosecha = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteCosechaRequest(id);
      postNotification(response.message || "Cosecha eliminada", "success");
      onSuccess();
    } catch (error: any) {
      postNotification(
        error.message || "Error al eliminar la cosecha",
        "error",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCosecha, loading };
}
