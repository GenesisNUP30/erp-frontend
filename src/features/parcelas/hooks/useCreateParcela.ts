import { useState } from "react";
import { createParcelaRequest } from "../services/parcelaService";
import { mapParcelaFormToCreateDTO } from "../mappers/parcela.mappers";
import type { ParcelaFormData } from "../schema/parcelaSchema";

export default function useCreateParcela(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);

  const createParcela = async (formData: ParcelaFormData) => {
    try {
      setLoading(true);
      setServerErrors(null);
      await createParcelaRequest(mapParcelaFormToCreateDTO(formData));
      onSuccess();
    } catch (error: any) {
      if (error.status === 422) setServerErrors(error.errors);
      else console.error("Error de servidor:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createParcela, loading, serverErrors };
}