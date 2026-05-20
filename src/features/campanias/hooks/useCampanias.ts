import { useEffect, useState } from "react";
import type { Campania } from "../types/ICampanias";
import { getCampaniasRequest } from "../services/campaniaService";

export default function useCampanias() {
  const [campanias, setCampanias] = useState<Campania[]>([]);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0,
  });

  const fetchCampanias = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getCampaniasRequest(page, pp);
      setCampanias(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando campañas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampanias(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchCampanias(page, perPage);
  };

  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchCampanias(1, pp);
  };

  // Filtrado local — sobre los datos ya cargados de la página actual
  const filteredCampanias = campanias.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado ? c.estado === filterEstado : true;
    return matchSearch && matchEstado;
  });

  return {
    campanias: filteredCampanias,
    search,
    setSearch,
    filterEstado,
    setFilterEstado,
    loading,
    refresh: () => fetchCampanias(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}