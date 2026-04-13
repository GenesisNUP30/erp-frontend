import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Parcela } from "../types/IParcelas";
import { getParcelaByIdRequest } from "../services/parcelaService";

export default function useParcelaDetails() {
  const { id } = useParams<{ id: string }>();
  const [parcela, setParcela] = useState<Parcela | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParcela = async (parcelaId: string) => {
    try {
      setLoading(true);
      const data = await getParcelaByIdRequest(parcelaId);
      setParcela(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) fetchParcela(id); }, [id]);

  return { parcela, loading, error, refresh: () => id && fetchParcela(id) };
}