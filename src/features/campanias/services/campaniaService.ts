import apiClient from "../../../api/apiClient";
import type { Campania, CreateCampaniaDTO, UpdateCampaniaDTO } from "../types/ICampanias";

/**
 * Tipado estándar de respuesta de Laravel
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * GET - Listado de campañas
 */
export const getCampaniasRequest = async (): Promise<Campania[]> => {
  const response = await apiClient.get<ApiResponse<Campania[]>>("/campanias");
  if (response.data.success) return response.data.data;
  throw new Error("Error obteniendo campañas");
};

/**
 * GET - Obtener una campaña por ID
 */
export const getCampaniaByIdRequest = async (id: string | number): Promise<Campania> => {
  const response = await apiClient.get<ApiResponse<Campania>>(`/campanias/${id}`);
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar la campaña");
};

/**
 * POST - Crear campaña
 */
export const createCampaniaRequest = async (data: CreateCampaniaDTO): Promise<ApiResponse<Campania>> => {
  const response = await apiClient.post<ApiResponse<Campania>>("/campanias", data);
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando campaña");
};

/**
 * PUT - Actualizar una campaña existente
 */
export const updateCampaniaRequest = async (id: number | string, data: UpdateCampaniaDTO): Promise<Campania> => {
  const response = await apiClient.put<ApiResponse<Campania>>(`/campanias/${id}`, data);
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar la campaña");
};

/**
 * DELETE - Eliminar campaña
 */
export const deleteCampaniaRequest = async (id: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/campanias/${id}`);
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando campaña");
};