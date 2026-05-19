import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPagoByIdRequest, updatePagoRequest } from "../services/pagoService";
import { mapPagoFormToDTO } from "../mappers/pago.mappers";
import { ROUTES } from "../../../routes/routes";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { Pago } from "../types/IPagos";
import type { PagoFormData } from "../schema/pagoSchema";

export default function useEditPago() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { postNotification } = useNotificationStore();
  const [pago, setPago] = useState<Pago | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    if (id) {
      getPagoByIdRequest(id)
        .then(setPago)
        .catch((err) => {
          setError(err.message);
          postNotification("No se pudo cargar el pago", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updatePago = async (data: PagoFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updatePagoRequest(id, mapPagoFormToDTO(data));
      postNotification("Pago actualizado con éxito", "success");
      navigate(ROUTES.PAGOS);
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

  return { pago, loading, updating, error, updatePago, serverErrors };
}
