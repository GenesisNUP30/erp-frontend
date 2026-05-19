import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getHorasByIdRequest,
  updateHorasRequest,
} from "../services/horasTrabajadaService";
import { mapHorasFormToDTO } from "../mappers/horas.mappers";
import { ROUTES } from "../../../routes/routes";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { HorasTrabajada } from "../types/IHorasTrabajadas";
import type { HorasFormData } from "../schema/horasTrabajadaSchema";

export default function useEditHoras() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { postNotification } = useNotificationStore();
  const [horas, setHoras] = useState<HorasTrabajada | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    if (id) {
      getHorasByIdRequest(id)
        .then(setHoras)
        .catch((err) => {
          setError(err.message);
          postNotification("No se pudo cargar el registro", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateHoras = async (data: HorasFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateHorasRequest(id, mapHorasFormToDTO(data));
      postNotification("Horas actualizadas con éxito", "success");
      navigate(ROUTES.HORAS_TRABAJADAS);
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

  return { horas, loading, updating, error, updateHoras, serverErrors };
}
