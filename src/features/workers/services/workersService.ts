import apiClient from '../../../api/apiClient';
import type { Worker } from '../types/IWorkers';

/**
 * Tipado estándar de respuesta de Laravel
 */
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
};

/**
 * GET - Listado de trabajadores
 */
export const getWorkersRequest = async (): Promise<Worker[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Worker[]>>(
      '/trabajadores',
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error('Error obteniendo trabajadores');
  } catch (error) {
    console.error('getWorkersRequest error:', error);
    throw error;
  }
};

/**
 * POST - Crear trabajador
 */
export const createWorkerRequest = async (
  data: Partial<Worker>,
): Promise<ApiResponse<Worker>> => {
  try {
    const response = await apiClient.post<ApiResponse<Worker>>(
      '/trabajadores',
      data,
    );

    if (response.data.success) {
      return response.data;
    }

    throw new Error(response.data.message || 'Error creando trabajador');
  } catch (error) {
    console.error('createWorkerRequest error:', error);
    throw error;
  }
};

/**
 * DELETE - Eliminar trabajador
 */
export const deleteWorkerRequest = async (id: number) => {
  try {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/trabajadores/${id}`,
    );

    if (response.data.success) {
      return response.data;
    }

    throw new Error(response.data.message || 'Error eliminando trabajador');
  } catch (error) {
    console.error('deleteWorkerRequest error:', error);
    throw error;
  }
};

/**
 * PUT - Actualizar trabajador
 */
export const updateWorkerRequest = async (
  id: number,
  data: Partial<Worker>,
): Promise<ApiResponse<Worker>> => {
  try {
    const response = await apiClient.put<ApiResponse<Worker>>(
      `/trabajadores/${id}`,
      data,
    );

    if (response.data.success) {
      return response.data;
    }

    throw new Error(response.data.message || 'Error actualizando trabajador');
  } catch (error) {
    console.error('updateWorkerRequest error:', error);
    throw error;
  }
};

/**
 * GET - Detalle trabajador
 */
export const getWorkerByIdRequest = async (
  id: number,
): Promise<Worker> => {
  try {
    const response = await apiClient.get<ApiResponse<Worker>>(
      `/trabajadores/${id}`,
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error('Error obteniendo trabajador');
  } catch (error) {
    console.error('getWorkerByIdRequest error:', error);
    throw error;
  }
};