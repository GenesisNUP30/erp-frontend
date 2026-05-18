import { useEffect, useState } from "react";
import type { Variedad } from "../types/IVariedades";
import { getVariedadesRequest } from "../services/variedadService";

export default function useVariedades() {
  const [variedades, setVariedades] = useState<Variedad[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVariedades = async () => {
    try {
      setLoading(true);
      const data = await getVariedadesRequest();
      setVariedades(data);
    } catch (error) {
      console.error("Error cargando variedades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVariedades(); }, []);

  const filteredVariedades = variedades.filter((v) =>
    v.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return { variedades: filteredVariedades, search, setSearch, loading, refresh: fetchVariedades };
}