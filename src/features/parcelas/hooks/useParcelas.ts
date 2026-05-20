import { useEffect, useState } from 'react';
import type { Parcela } from '../types/IParcelas';
import { getParcelasRequest } from '../services/parcelaService';

export default function useParcelas() {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 5, total: 0 });

  const fetchParcelas = async (page: number, pp: number) => {
    try {
      setLoading(true);
      const { data, meta } = await getParcelasRequest(page, pp);
      setParcelas(data);
      setMeta(meta);
    } catch (error) {
      console.error('Error cargando parcelas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchParcelas(currentPage, perPage); }, []);

  const onPageChange = (page: number) => { setCurrentPage(page); fetchParcelas(page, perPage); };
  const onPerPageChange = (pp: number) => { setPerPage(pp); setCurrentPage(1); fetchParcelas(1, pp); };

  const filteredParcelas = parcelas.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filterEstado ? p.estado === filterEstado : true;
    return matchSearch && matchEstado;
  });

  return {
    parcelas: filteredParcelas,
    search, setSearch,
    filterEstado, setFilterEstado,
    loading,
    refresh: () => fetchParcelas(currentPage, perPage),
    currentPage, lastPage: meta.last_page, perPage, total: meta.total,
    onPageChange, onPerPageChange,
  };
}