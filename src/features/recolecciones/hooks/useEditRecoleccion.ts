import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRecoleccionByIdRequest,
  updateRecoleccionRequest,
} from "../services/recoleccionService";
import { mapRecoleccionFormToDTO } from "../mappers/recoleccion.mappers";
import { ROUTES } from "../../../routes/routes";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { Recoleccion } from "../types/IRecolecciones";
import type { RecoleccionFormData } from "../schema/recoleccionSchema";

export default function useEditRecoleccion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { postNotification } = useNotificationStore();
  const [recoleccion, setRecoleccion] = useState<Recoleccion | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    if (id) {
      getRecoleccionByIdRequest(id)
        .then(setRecoleccion)
        .catch((err) => {
          setError(err.message);
          postNotification("No se pudo cargar la recolección", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateRecoleccion = async (data: RecoleccionFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateRecoleccionRequest(id, mapRecoleccionFormToDTO(data));
      postNotification("Recolección actualizada con éxito", "success");
      navigate(ROUTES.RECOLECCIONES);
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
        postNotification("Revisa los errores del formulario", "error");
      } else {
        postNotification(err.message || "Error al actualizar", "error");
      }
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    recoleccion,
    loading,
    updating,
    error,
    updateRecoleccion,
    serverErrors,
  };
}
