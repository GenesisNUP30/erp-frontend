import { useEffect, useState } from 'react';
import type { Worker } from '../types/IWorkers';
import { getWorkersRequest } from '../services/workersService';

export default function useWorkers() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);

        const data = await getWorkersRequest();

        setWorkers(data);
      } catch (error) {
        console.error('Error cargando trabajadores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    workers: filteredWorkers,
    search,
    setSearch,
    loading,
  };
}