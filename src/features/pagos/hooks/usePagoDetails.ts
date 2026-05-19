import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Pago } from "../types/IPagos";
import { getPagoByIdRequest } from "../services/pagoService";

export default function usePagoDetails() {
  const { id } = useParams<{ id: string }>();
  const [pago, setPago] = useState<Pago | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPago = async (pid: string) => {
    try {
      setLoading(true);
      const data = await getPagoByIdRequest(pid);
      setPago(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPago(id);
  }, [id]);
  return { pago, loading, error, refresh: () => id && fetchPago(id) };
}
