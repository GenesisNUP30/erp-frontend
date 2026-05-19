import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPlantacionByIdRequest,
  updatePlantacionRequest,
} from "../services/plantacionService";
import { ROUTES } from "../../../routes/routes";
import type { Plantacion } from "../types/IPlantaciones";
import type { PlantacionFormData } from "../schema/plantacionSchema";
import { mapPlantacionFormToUpdateDTO } from "../mappers/plantaciones.mappers";

export default function useEditPlantacion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plantacion, setPlantacion] = useState<Plantacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  useEffect(() => {
    if (id) {
      getPlantacionByIdRequest(id)
        .then(setPlantacion)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const updatePlantacion = async (data: PlantacionFormData) => {
    if (!id) return;
    try {
      setUpdating(true);
      setServerErrors(null);
      await updatePlantacionRequest(id, mapPlantacionFormToUpdateDTO(data));
      navigate(ROUTES.PLANTACIONES);
    } catch (err: any) {
      if (err.status === 422) setServerErrors(err.errors);
      setUpdating(false);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  return {
    plantacion,
    loading,
    updating,
    error,
    updatePlantacion,
    serverErrors,
  };
}
