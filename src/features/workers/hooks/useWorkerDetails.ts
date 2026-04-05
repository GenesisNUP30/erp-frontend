import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Worker } from "../types/IWorkers";
import { getWorkerByIdRequest } from "../services/workersService";

export default function useWorkerDetails() {
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchWorker(id);
    }
  }, [id]);

  const fetchWorker = async (workerId: string) => {
    try {
      setLoading(true);

      const data = await getWorkerByIdRequest(workerId);

      setWorker(data);
    } catch (error: any) {
      setError(error.message);
      console.error("Error al cargar los detalles del trabajador:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    worker,
    loading,
    error,
    refresh: () => id && fetchWorker(id)
  };
}

