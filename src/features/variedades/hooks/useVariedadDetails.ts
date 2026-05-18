import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Variedad } from "../types/IVariedades";
import { getVariedadByIdRequest } from "../services/variedadService";

export default function useVariedadDetails() {
  const { id } = useParams<{ id: string }>();
  const [variedad, setVariedad] = useState<Variedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVariedad = async (variedadId: string) => {
    try {
      setLoading(true);
      const data = await getVariedadByIdRequest(variedadId);
      setVariedad(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) fetchVariedad(id); }, [id]);

  return { variedad, loading, error, refresh: () => id && fetchVariedad(id) };
}