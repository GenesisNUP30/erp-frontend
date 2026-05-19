import { useEffect, useState } from "react";
import type { SelectOption } from "../types/IPlantaciones";
import {
  getParcelasActivasRequest,
  getVariedadesRequest,
  getCampaniasActivasRequest,
} from "../services/plantacionService";

export default function useSelectOptions() {
  const [parcelas, setParcelas] = useState<SelectOption[]>([]);
  const [variedades, setVariedades] = useState<SelectOption[]>([]);
  const [campanias, setCampanias] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getParcelasActivasRequest(),
      getVariedadesRequest(),
      getCampaniasActivasRequest(),
    ])
      .then(([p, v, c]) => {
        setParcelas(p);
        setVariedades(v);
        setCampanias(c);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { parcelas, variedades, campanias, loading };
}
