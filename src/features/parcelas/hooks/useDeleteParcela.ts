import { useState } from "react";
import { deleteParcelaRequest } from "../services/parcelaService";

export default function useDeleteParcela(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);

  const deleteParcela = async (id: number) => {
    try {
      setLoading(true);
      await deleteParcelaRequest(id);
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