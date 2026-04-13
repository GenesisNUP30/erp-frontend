import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getWorkerByIdRequest,
  updateWorkerRequest,
} from "../services/workerService";
import { ROUTES } from "../../../routes/routes";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { UpdateWorkerDTO, Worker } from "../types/IWorkers";
import type { WorkerFormData } from "../schema/workerSchema";

export default function useEditWorker() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { postNotification } = useNotificationStore();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    if (id) {
      getWorkerByIdRequest(id)
        .then(setWorker)
        .catch((err) => {
          setError(err.message);
          postNotification(
            "No se pudo cargar la información del trabajador",
            "error",
          );
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateWorker = async (data: WorkerFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateWorkerRequest(id, data as UpdateWorkerDTO);

      // Lanzamos notificación de éxito
      postNotification("Trabajador actualizado correctamente", "success");

      navigate(ROUTES.WORKERS);
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
        postNotification("Revisa los errores en el formulario", "error");
      } else {
        postNotification(
          err.message || "Error al actualizar el trabajador",
          "error",
        );
      }
      setUpdating(false);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { worker, loading, updating, error, updateWorker, serverErrors };
}
