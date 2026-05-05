import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Campania } from "../types/ICampanias";
import { getCampaniaByIdRequest } from "../services/campaniaService";

export default function useCampaniaDetails() {
  const { id } = useParams<{ id: string }>();
  const [campania, setCampania] = useState<Campania | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampania = async (campaniaId: string) => {
    try {
      setLoading(true);
      const data = await getCampaniaByIdRequest(campaniaId);
      setCampania(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) fetchCampania(id); }, [id]);

  return { campania, loading, error, refresh: () => id && fetchCampania(id) };
}