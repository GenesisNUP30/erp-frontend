import { useState } from "react";
import { deletePlantacionRequest } from "../services/plantacionService";

export default function useDeletePlantacion(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);

  const deletePlantacion = async (id: number) => {
    try {
      setLoading(true);
      await deletePlantacionRequest(id);
      onSuccess();
    } catch (error) {
      console.error("Error eliminando plantación:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deletePlantacion, loading };
}
