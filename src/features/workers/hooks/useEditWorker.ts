import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkerByIdRequest, updateWorkerRequest } from "../services/workersService";
import { ROUTES } from "../../../routes/routes";
import type { Worker } from "../types/IWorkers";

export default function useEditWorker() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (id) {
      getWorkerByIdRequest(id)
        .then(setWorker)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateWorker = async (data: Partial<Worker>) => {
    if (!id) return;
    try {
      setUpdating(true);
      await updateWorkerRequest(id, data);
      navigate(ROUTES.WORKER_DETAILS.replace(':id', id)); // Volvemos al detalle tras editar
    } catch (err: any) {
      throw err; // Lo lanzamos para que el formulario maneje los errores de validación
    } finally {
      setUpdating(false);
    }
  };

  return { worker, loading, updating, error, updateWorker };
}