import { useEffect, useState } from "react";
import type { Cosecha } from "../types/ICosechas";
import { getCosechasRequest } from "../services/cosechaService";

export default function useCosechas() {
  const [cosechas, setCosechas] = useState<Cosecha[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterEstado, setFilterEstado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0,
  });

  const fetchCosechas = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getCosechasRequest(page, pp);
      setCosechas(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando cosechas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCosechas(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchCosechas(page, perPage);
  };
  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchCosechas(1, pp);
  };

  // Filtrado local — sobre los datos ya cargados de la página actual
  const filteredCosechas = cosechas.filter((c) => {
    const matchSearch = c.nombre_cosecha.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado ? c.estado === filterEstado : true;
    return matchSearch && matchEstado;
  });

  return {
    cosechas: filteredCosechas,
    search,
    setSearch,
    filterEstado,
    setFilterEstado,
    loading,
    refresh: () => fetchCosechas(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}
