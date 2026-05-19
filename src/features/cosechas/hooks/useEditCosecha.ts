import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCosechaByIdRequest,
  updateCosechaRequest,
} from "../services/cosechaService";
import { mapCosechaFormToDTO } from "../mappers/cosecha.mappers";
import { ROUTES } from "../../../routes/routes";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { Cosecha } from "../types/ICosechas";
import type { CosechaFormData } from "../schema/cosechaSchema";

export default function useEditCosecha() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { postNotification } = useNotificationStore();
  const [cosecha, setCosecha] = useState<Cosecha | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    if (id) {
      getCosechaByIdRequest(id)
        .then(setCosecha)
        .catch((err) => {
          setError(err.message);
          postNotification("No se pudo cargar la cosecha", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateCosecha = async (data: CosechaFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateCosechaRequest(id, mapCosechaFormToDTO(data));
      postNotification("Cosecha actualizada con éxito", "success");
      navigate(ROUTES.COSECHAS);
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
        postNotification("Revisa los errores del formulario", "error");
      } else {
        postNotification(
          err.message || "Error al actualizar la cosecha",
          "error",
        );
      }
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { cosecha, loading, updating, error, updateCosecha, serverErrors };
}
