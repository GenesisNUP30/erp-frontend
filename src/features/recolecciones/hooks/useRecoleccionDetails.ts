import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recoleccion } from "../types/IRecolecciones";
import { getRecoleccionByIdRequest } from "../services/recoleccionService";

export default function useRecoleccionDetails() {
  const { id } = useParams<{ id: string }>();
  const [recoleccion, setRecoleccion] = useState<Recoleccion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecoleccion = async (rid: string) => {
    try {
      setLoading(true);
      const data = await getRecoleccionByIdRequest(rid);
      setRecoleccion(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRecoleccion(id);
  }, [id]);
  return {
    recoleccion,
    loading,
    error,
    refresh: () => id && fetchRecoleccion(id),
  };
}
