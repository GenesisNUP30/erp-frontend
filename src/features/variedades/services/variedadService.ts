import apiClient from "../../../api/apiClient";
import type {
  Variedad,
  CreateVariedadDTO,
  UpdateVariedadDTO,
} from "../types/IVariedades";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * GET - Listado de variedades
 */
export const getVariedadesRequest = async (): Promise<Variedad[]> => {
  const response = await apiClient.get<ApiResponse<Variedad[]>>("/variedades");
  if (response.data.success) return response.data.data;

  throw new Error("Error obteniendo variedades");
};

/**
 * GET - Obtener una variedad por ID
 */
export const getVariedadByIdRequest = async (
  id: string | number,
): Promise<Variedad> => {
  const response = await apiClient.get<ApiResponse<Variedad>>(
    `/variedades/${id}`,
  );
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar la variedad");
};

/**
 * POST - Crear variedad
 */
export const createVariedadRequest = async (
  data: CreateVariedadDTO,
): Promise<ApiResponse<Variedad>> => {
  const response = await apiClient.post<ApiResponse<Variedad>>(
    "/variedades",
    data,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando variedad");
};

/**
 * PUT - Actualizar una variedad existente
 */
export const updateVariedadRequest = async (
  id: number | string,
  data: UpdateVariedadDTO,
): Promise<Variedad> => {
  const response = await apiClient.put<ApiResponse<Variedad>>(
    `/variedades/${id}`,
    data,
  );
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar la variedad");
};

/**
 * DELETE - Eliminar una variedad
 */
export const deleteVariedadRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/variedades/${id}`,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando variedad");
};
