import { useState } from 'react';
import { deleteWorkerRequest } from '../services/workersService';

export default function useDeleteWorker(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);

  const deleteWorker = async (id: number) => {
    try {
      setLoading(true);

      const response = await deleteWorkerRequest(id);

      onSuccess();

      return response;
    } catch (error) {
      console.error('Error eliminando trabajador:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteWorker,
    loading,
  };
}