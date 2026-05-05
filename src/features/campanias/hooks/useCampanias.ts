import { useEffect, useState } from "react";
import type { Campania } from "../types/ICampanias";
import { getCampaniasRequest } from "../services/campaniaService";

export default function useCampanias() {
  const [campanias, setCampanias] = useState<Campania[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCampanias = async () => {
    try {
      setLoading(true);
      const data = await getCampaniasRequest();
      setCampanias(data);
    } catch (error) {
      console.error("Error cargando campañas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCampanias(); }, []);

  const filteredCampanias = campanias.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return { campanias: filteredCampanias, search, setSearch, loading, refresh: fetchCampanias };
}