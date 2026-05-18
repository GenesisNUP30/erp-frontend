import apiClient from "../../../api/apiClient";
import type { Worker, CreateWorkerDTO } from "../types/IWorkers";

/**
 * Tipado estándar de respuesta de Laravel
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

/**
 * GET - Listado de trabajadores
 */
export const getWorkersRequest = async (
  page = 1,
  perPage = 5,
): Promise<{ data: Worker[]; meta: any }> => {
  const response = await apiClient.get<ApiResponse<Worker[]>>(
    `/trabajadores?page=${page}&per_page=${perPage}`,
  );
  if (response.data.success) {
    return { data: response.data.data, meta: response.data.meta };
  }
  throw new Error("Error obteniendo trabajadores");
};

/**
 * GET - Obtener un trabajador por ID
 */
export const getWorkerByIdRequest = async (
  id: string | number,
): Promise<Worker> => {
  const response = await apiClient.get<ApiResponse<Worker>>(
    `/trabajadores/${id}`,
  );

  if (response.data.success) {
    return response.data.data;
  }
  throw new Error("No se pudo cargar el trabajador");
};

/**
 * POST - Crear trabajador
 */
export const createWorkerRequest = async (
  data: CreateWorkerDTO,
): Promise<ApiResponse<Worker>> => {
  const response = await apiClient.post<ApiResponse<Worker>>(
    "/trabajadores",
    data,
  );

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Error creando trabajador");
};

/**
 * PUT - Actualizar un trabajador existente
 */
export const updateWorkerRequest = async (
  id: number | string,
  data: Partial<Worker>,
): Promise<Worker> => {
  const response = await apiClient.put<ApiResponse<Worker>>(
    `/trabajadores/${id}`,
    data,
  );

  if (response.data.success) {
    return response.data.data;
  }
  throw new Error("Error al actualizar el trabajador");
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

    throw new Error(response.data.message || "Error eliminando trabajador");
  } catch (error) {
    console.error("deleteWorkerRequest error:", error);
    throw error;
  }
};
