import { useEffect, useState } from 'react';
import type { Pago } from '../types/IPagos';
import { getPagosRequest } from '../services/pagoService';

export default function usePagos() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 5, total: 0 });

  const fetchPagos = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getPagosRequest(page, pp);
      setPagos(data);
      setMeta(meta);
    } catch (error) {
      console.error('Error cargando pagos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPagos(currentPage, perPage); }, []);

  const onPageChange = (page: number) => { setCurrentPage(page); fetchPagos(page, perPage); };
  const onPerPageChange = (pp: number) => { setPerPage(pp); setCurrentPage(1); fetchPagos(1, pp); };

  const filteredPagos = pagos.filter((p) => {
    const matchSearch = p.trabajador?.name?.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado ? p.estado === filterEstado : true;
    return matchSearch && matchEstado;
  });

  return {
    pagos: filteredPagos,
    search, setSearch,
    filterEstado, setFilterEstado,
    loading,
    refresh: () => fetchPagos(currentPage, perPage),
    currentPage, lastPage: meta.last_page, perPage, total: meta.total,
    onPageChange, onPerPageChange,
  };
}