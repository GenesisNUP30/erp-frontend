import { useState, useMemo } from "react";

export default function usePagination<T>(items: T[], defaultPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);

  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));

  // Si al cambiar perPage la página actual ya no existe, volvemos a 1
  const safePage = Math.min(currentPage, lastPage);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return items.slice(start, start + perPage);
  }, [items, safePage, perPage]);

  return {
    items: paginated,
    currentPage: safePage,
    lastPage,
    perPage,
    total,
    setPage: setCurrentPage,
    setPerPage: (n: number) => { setPerPage(n); setCurrentPage(1); },
  };
}