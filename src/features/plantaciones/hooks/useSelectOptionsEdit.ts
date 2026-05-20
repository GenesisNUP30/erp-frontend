import { useEffect, useState } from "react";
import type { SelectOption } from "../types/IPlantaciones";
import {
  getParcelasActivasRequest,
  getVariedadesRequest,
  getCampaniasActivasRequest,
} from "../services/plantacionService";

interface Props {
  parcelaId: number;
  variedadId: number;
  campaniaId: number;
}

export default function useSelectOptionsEdit({
  parcelaId,
  variedadId,
  campaniaId,
}: Props) {
  const [parcelas, setParcelas] = useState<SelectOption[]>([]);
  const [variedades, setVariedades] = useState<SelectOption[]>([]);
  const [campanias, setCampanias] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getParcelasActivasRequest(parcelaId),
      getVariedadesRequest(variedadId),
      getCampaniasActivasRequest(campaniaId),
    ])
      .then(([p, v, c]) => {
        setParcelas(p);
        setVariedades(v);
        setCampanias(c);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [parcelaId, variedadId, campaniaId]);

  return { parcelas, variedades, campanias, loading };
}
