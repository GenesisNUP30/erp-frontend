import { useEffect, useState } from "react";
import type { HorasTrabajada } from "../types/IHorasTrabajadas";
import { getHorasRequest } from "../services/horasTrabajadaService";

export default function useHorasTrabajadas() {
  const [horas, setHoras] = useState<HorasTrabajada[]>([]);
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

  const fetchHoras = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getHorasRequest(page, pp);
      setHoras(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando horas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoras(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchHoras(page, perPage);
  };
  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchHoras(1, pp);
  };

  const filteredHoras = horas.filter(
    (h) =>
      h.trabajador?.name?.toLowerCase().includes(search.toLowerCase()) ||
      h.tipo_trabajo?.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    horas: filteredHoras,
    search,
    setSearch,
    loading,
    refresh: () => fetchHoras(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}
