import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { HorasTrabajada } from "../types/IHorasTrabajadas";
import { getHorasByIdRequest } from "../services/horasTrabajadaService";

export default function useHorasDetails() {
  const { id } = useParams<{ id: string }>();
  const [horas, setHoras] = useState<HorasTrabajada | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHoras = async (hid: string) => {
    try {
      setLoading(true);
      const data = await getHorasByIdRequest(hid);
      setHoras(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchHoras(id);
  }, [id]);
  return { horas, loading, error, refresh: () => id && fetchHoras(id) };
}
