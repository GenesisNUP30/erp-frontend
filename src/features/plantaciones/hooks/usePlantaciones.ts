import { useEffect, useState } from "react";
import type { Plantacion } from "../types/IPlantaciones";
import { getPlantacionesRequest } from "../services/plantacionService";

export default function usePlantaciones() {
  const [plantaciones, setPlantaciones] = useState<Plantacion[]>([]);
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

  const fetchPlantaciones = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getPlantacionesRequest(page, pp);
      setPlantaciones(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando plantaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlantaciones(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchPlantaciones(page, perPage);
  };
  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchPlantaciones(1, pp);
  };

  const filteredPlantaciones = plantaciones.filter((p) => {
    const matchSearch =
      p.parcela?.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      p.variedad?.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      p.campania?.nombre?.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado ? p.estado === filterEstado : true;
    return (matchSearch ?? false) && matchEstado;
  });

  return {
    plantaciones: filteredPlantaciones,
    search,
    setSearch,
    filterEstado,
    setFilterEstado,
    loading,
    refresh: () => fetchPlantaciones(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}
