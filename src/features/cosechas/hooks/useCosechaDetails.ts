import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Cosecha } from "../types/ICosechas";
import { getCosechaByIdRequest } from "../services/cosechaService";

export default function useCosechaDetails() {
  const { id } = useParams<{ id: string }>();
  const [cosecha, setCosecha] = useState<Cosecha | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCosecha = async (cosechaId: string) => {
    try {
      setLoading(true);
      const data = await getCosechaByIdRequest(cosechaId);
      setCosecha(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCosecha(id);
  }, [id]);
  return { cosecha, loading, error, refresh: () => id && fetchCosecha(id) };
}
