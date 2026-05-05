import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaniaByIdRequest, updateCampaniaRequest } from "../services/campaniaService";
import { mapCampaniaFormToUpdateDTO } from "../mappers/campania.mappers";
import { ROUTES } from "../../../routes/routes";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { Campania } from "../types/ICampanias";
import type { CampaniaFormData } from "../schema/campaniaSchema";

export default function useEditCampania() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { postNotification } = useNotificationStore();
  
  const [campania, setCampania] = useState<Campania | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    if (id) {
      getCampaniaByIdRequest(id)
        .then(setCampania)
        .catch((err) => {
            setError(err.message);
            postNotification(
                "No se pudo cargar la información de la campaña",
                "error",
            );
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateCampania = async (data: CampaniaFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateCampaniaRequest(id, mapCampaniaFormToUpdateDTO(data));

      postNotification("Campaña actualizada con éxito", "success");

      navigate(ROUTES.CAMPANIAS);
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
        postNotification("Revisa los errores en el formulario", "error");
      } else {
        postNotification(
          err.message || "Error al actualizar la campaña",
          "error",
        );
      }
      setUpdating(false);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { campania, loading, updating, error, updateCampania, serverErrors };
}