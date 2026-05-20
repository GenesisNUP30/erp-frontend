import { useEffect, useState } from "react";
import type { Worker } from "../types/IWorkers";
import { getWorkersRequest } from "../services/workerService";

export default function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [filterRol, setFilterRol] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0,
  });

  const fetchWorkers = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getWorkersRequest(page, pp);
      setWorkers(data);
      setMeta(meta);
    } catch (error) {
      console.error("Error cargando trabajadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers(currentPage, perPage);
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    fetchWorkers(page, perPage);
  };
  const onPerPageChange = (pp: number) => {
    setPerPage(pp);
    setCurrentPage(1);
    fetchWorkers(1, pp);
  };

  const filteredWorkers = workers.filter((w) => {
    const matchSearch =
      w.name?.toLowerCase().includes(search.toLowerCase()) ||
      w.username?.toLowerCase().includes(search.toLowerCase()) ||
      w.dni?.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado ? w.estado === filterEstado : true;
    const matchRol = filterRol ? w.rol === filterRol : true;
    return (matchSearch ?? false) && matchEstado && matchRol;
  });

  return {
    workers: filteredWorkers,
    search,
    setSearch,
    filterEstado,
    setFilterEstado,
    filterRol,
    setFilterRol,
    loading,
    refresh: () => fetchWorkers(currentPage, perPage),
    currentPage,
    lastPage: meta.last_page,
    perPage,
    total: meta.total,
    onPageChange,
    onPerPageChange,
  };
}
