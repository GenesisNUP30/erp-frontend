import { useState } from 'react';
import { createWorkerRequest } from '../services/workersService';
import type { Role } from '../../../constants/roles';
// import { useNotificationStore } from '@/stores/notificationStore';

type CreateWorkerDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
  dni: string;
  telefono: string;
  rol: Role;
  fecha_alta: string;
};

export default function useCreateWorker(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  // const { postNotification } = useNotificationStore();

  const createWorker = async (data: CreateWorkerDTO) => {
    try {
      setLoading(true);

      const response = await createWorkerRequest(data);

      // ✅ SUCCESS (como en useCrews)
      // postNotification(
      //   response.message || 'El trabajador ha sido creado correctamente',
      //   'success',
      // );

      onSuccess();

      return response;
    } catch (error) {
      console.error('Error creando trabajador:', error);

      // ❌ ERROR
      // postNotification(
      //   error instanceof Error ? error.message : 'Error desconocido',
      //   'error',
      // );

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