import { useEffect, useState } from "react";
import type { Recoleccion } from "../types/IRecolecciones";
import { getRecoleccionesRequest } from "../services/recoleccionService";

export default function useRecolecciones() {
  const [recolecciones, setRecolecciones] = useState<Recoleccion[]>([]);
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

  const fetchRecolecciones = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getRecoleccionesRequest(page, pp);
      setRecolecciones(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando recolecciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecolecciones(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchRecolecciones(page, perPage);
  };
  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchRecolecciones(1, pp);
  };

  const filteredRecolecciones = recolecciones.filter(
    (r) =>
      r.cosecha?.nombre_cosecha?.toLowerCase().includes(search.toLowerCase()) ||
      r.recolector?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    recolecciones: filteredRecolecciones,
    search,
    setSearch,
    loading,
    refresh: () => fetchRecolecciones(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}
