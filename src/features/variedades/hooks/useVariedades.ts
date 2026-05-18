import { useEffect, useState } from "react";
import type { Variedad } from "../types/IVariedades";
import { getVariedadesRequest } from "../services/variedadService";

export default function useVariedades() {
  const [variedades, setVariedades] = useState<Variedad[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0,
  });

  const fetchVariedades = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getVariedadesRequest(page, pp);
      setVariedades(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando variedades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariedades(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchVariedades(page, perPage);
  };

  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchVariedades(1, pp);
  };

  const filteredVariedades = variedades.filter((v) =>
    v.nombre.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    variedades: filteredVariedades,
    search,
    setSearch,
    loading,
    refresh: () => fetchVariedades(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}
