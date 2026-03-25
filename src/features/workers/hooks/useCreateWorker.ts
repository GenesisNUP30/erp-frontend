import { useState } from 'react';
import { createWorkerRequest } from '../services/workersService';
import type { WorkerFormData } from '../schema/workerSchema';
import { mapWorkerFormToCreateDTO } from '../mappers/worker.mappers';

export default function useCreateWorker(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);

  const createWorker = async (formData: WorkerFormData) => {
    try {
      setLoading(true);

      const payload = mapWorkerFormToCreateDTO(formData);

      const response = await createWorkerRequest(payload);

      onSuccess();

      return response;
    } catch (error) {
      console.error('Error creando trabajador:', error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createWorker,
    loading,
  };
}