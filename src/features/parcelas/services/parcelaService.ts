import apiClient from "../../../api/apiClient";
import type {
  Parcela,
  CreateParcelaDTO,
  UpdateParcelaDTO,
} from "../types/IParcelas";

/**
 * Tipado estándar de respuesta de Laravel
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * GET - Listado de parcelas
 */
export const getParcelasRequest = async (): Promise<Parcela[]> => {
  const response = await apiClient.get<ApiResponse<Parcela[]>>("/parcelas");
  if (response.data.success) return response.data.data;
  throw new Error("Error obteniendo parcelas");
};

/**
 * GET - Obtener una parcela por ID
 */
export const getParcelaByIdRequest = async (
  id: string | number,
): Promise<Parcela> => {
  const response = await apiClient.get<ApiResponse<Parcela>>(`/parcelas/${id}`);
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar la parcela");
};

/**
 * POST - Crear parcela
 */
export const createParcelaRequest = async (
  data: CreateParcelaDTO,
): Promise<ApiResponse<Parcela>> => {
  const response = await apiClient.post<ApiResponse<Parcela>>(
    "/parcelas",
    data,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando parcela");
};

/**
 * PUT - Actualizar una parcela existente
 */
export const updateParcelaRequest = async (
  id: number | string,
  data: UpdateParcelaDTO,
): Promise<Parcela> => {
  const response = await apiClient.put<ApiResponse<Parcela>>(
    `/parcelas/${id}`,
    data,
  );
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar la parcela");
};

/**
 * DELETE - Eliminar parcela
 */
export const deleteParcelaRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/parcelas/${id}`);
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando parcela");
};
