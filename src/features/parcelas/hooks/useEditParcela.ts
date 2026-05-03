import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getParcelaByIdRequest,
  updateParcelaRequest,
} from "../services/parcelaService";
import { mapParcelaFormToUpdateDTO } from "../mappers/parcela.mappers";
import { ROUTES } from "../../../routes/routes";
import type { Parcela } from "../types/IParcelas";
import type { ParcelaFormData } from "../schema/parcelaSchema";
import { useNotificationStore } from "../../../stores/notificationStore";

export default function useEditParcela() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parcela, setParcela] = useState<Parcela | null>(null);
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
      getParcelaByIdRequest(id)
        .then(setParcela)
        .catch((err) => {
          setError(err.message);
          postNotification(
            "No se pudo cargar la información de la parcela",
            "error",
          );
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updateParcela = async (data: ParcelaFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updateParcelaRequest(id, mapParcelaFormToUpdateDTO(data));

      // Lanzamos notificación de éxito
      postNotification("Parcela actualizado correctamente", "success");

      navigate(ROUTES.PARCELAS);
    } catch (err: any) {
      if (err.status === 422) {
        setServerErrors(err.errors);
        postNotification("Revisa los errores en el formulario", "error");
      } else {
        postNotification(
          err.message || "Error al actualizar la parcela",
          "error",
        );
      }
      setUpdating(false);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return { parcela, loading, updating, error, updateParcela, serverErrors };
}
