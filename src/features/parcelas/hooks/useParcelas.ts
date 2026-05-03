import { useEffect, useState } from "react";
import type { Parcela } from "../types/IParcelas";
import { getParcelasRequest } from "../services/parcelaService";

export default function useParcelas() {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchParcelas = async () => {
    try {
      setLoading(true);
      const data = await getParcelasRequest();
      setParcelas(data);
    } catch (error) {
      console.error("Error cargando parcelas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchParcelas(); }, []);

  const filteredParcelas = parcelas.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return { parcelas: filteredParcelas, search, setSearch, loading, refresh: fetchParcelas };
}