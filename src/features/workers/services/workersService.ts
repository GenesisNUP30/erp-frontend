import apiClient from "../../../api/apiClient";
import type { Worker, CreateWorkerDTO } from "../types/IWorkers";

/**
 * Tipado estándar de respuesta de Laravel
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

/**
 * GET - Listado de trabajadores
 */
export const getWorkersRequest = async (): Promise<Worker[]> => {
  try {
    const response =
      await apiClient.get<ApiResponse<Worker[]>>("/trabajadores");

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error("Error obteniendo trabajadores");
  } catch (error) {
    console.error("getWorkersRequest error:", error);
    throw error;
  }
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
