import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getVariedadByIdRequest,
  updateVariedadRequest,
} from "../services/variedadService";
import { mapVariedadFormToUpdateDTO } from "../mappers/variedad.mappers";
import { ROUTES } from "../../../routes/routes";
import type { Variedad } from "../types/IVariedades";
import type { VariedadFormData } from "../schema/variedadSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useEditVariedad() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [variedad, setVariedad] = useState<Variedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const { postNotification } = useNotificationStore();

  useEffect(() => {
    if (id) {
      getVariedadByIdRequest(id)
        .then(setVariedad)
        .catch((err) => {
          setError(err.message);
          postNotification(
            "No se pudo cargar la información de la variedad",
            "error",
          );
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateVariedad = async (data: VariedadFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateVariedadRequest(id, mapVariedadFormToUpdateDTO(data));

      postNotification("Variedad actualizada con éxito", "success");

      navigate(ROUTES.VARIEDADES);
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
        postNotification("Error de validación: revisa los datos", "error");
      } else {
        console.error("Error de servidor:", err.message);
        postNotification(
          err.message || "No se pudo actualizar la variedad",
          "error",
        );
      }
      setUpdating(false);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { variedad, loading, updating, error, updateVariedad, serverErrors };
}
