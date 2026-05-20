import apiClient from "../../../api/apiClient";
import type {
  HorasTrabajada,
  CreateHorasTrabajadaDTO,
  UpdateHorasTrabajadaDTO,
} from "../types/IHorasTrabajadas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export const getHorasRequest = async (
  page = 1,
  perPage = 5,
  userId?: number,
): Promise<{ data: HorasTrabajada[]; meta: any }> => {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (userId) params.append("user_id", String(userId));
  const response = await apiClient.get<ApiResponse<HorasTrabajada[]>>(
    `/horas-trabajadas?${params}`,
  );
  if (response.data.success)
    return { data: response.data.data, meta: response.data.meta };
  throw new Error("Error obteniendo horas trabajadas");
};

export const getHorasByIdRequest = async (
  id: string | number,
): Promise<HorasTrabajada> => {
  const response = await apiClient.get<ApiResponse<HorasTrabajada>>(
    `/horas-trabajadas/${id}`,
  );
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar el registro");
};

export const createHorasRequest = async (
  data: CreateHorasTrabajadaDTO,
): Promise<ApiResponse<HorasTrabajada>> => {
  const response = await apiClient.post<ApiResponse<HorasTrabajada>>(
    "/horas-trabajadas",
    data,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error registrando horas");
};

export const updateHorasRequest = async (
  id: number | string,
  data: UpdateHorasTrabajadaDTO,
): Promise<HorasTrabajada> => {
  const response = await apiClient.put<ApiResponse<HorasTrabajada>>(
    `/horas-trabajadas/${id}`,
    data,
  );
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar horas");
};

export const deleteHorasRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/horas-trabajadas/${id}`,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando registro");
};
