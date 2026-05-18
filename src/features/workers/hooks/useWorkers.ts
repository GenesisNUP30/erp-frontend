import { useEffect, useState } from "react";
import type { Worker } from "../types/IWorkers";
import { getWorkersRequest } from "../services/workerService";

export default function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
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

  const fetchWorkers = async (page: number, pp: number) => {
    try {
      setLoading(true);

      const { data, meta } = await getWorkersRequest(page, pp);
      setWorkers(data);
      setMeta(meta);
    } catch (error: any) {
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

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    workers: filteredWorkers,
    search,
    setSearch,
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
