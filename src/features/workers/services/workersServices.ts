import apiClient from '../../../api/apiClient';
import type { Worker } from '../types/IWorkers';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  count?: number;
};

export const getWorkersRequest = async (): Promise<Worker[]> => {
  const response = await apiClient.get<ApiResponse<Worker[]>>(
    '/trabajadores',
  );

  return response.data.data;
};