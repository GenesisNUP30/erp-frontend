import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Plantacion } from "../types/IPlantaciones";
import { getPlantacionByIdRequest } from "../services/plantacionService";

export default function usePlantacionDetails() {
  const { id } = useParams<{ id: string }>();
  const [plantacion, setPlantacion] = useState<Plantacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlantacion = async (plantacionId: string) => {
    try {
      setLoading(true);
      const data = await getPlantacionByIdRequest(plantacionId);
      setPlantacion(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) fetchPlantacion(id); }, [id]);

  return { plantacion, loading, error, refresh: () => id && fetchPlantacion(id) };
}