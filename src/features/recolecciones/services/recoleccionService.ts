import apiClient from "../../../api/apiClient";
import type {
  Recoleccion,
  CreateRecoleccionDTO,
  UpdateRecoleccionDTO,
} from "../types/IRecolecciones";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export const getRecoleccionesRequest = async (
  page = 1,
  perPage = 5,
  cosechaId?: number,
): Promise<{ data: Recoleccion[]; meta: any }> => {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (cosechaId) params.append("cosecha_id", String(cosechaId));
  const response = await apiClient.get<ApiResponse<Recoleccion[]>>(
    `/recolecciones?${params}`,
  );
  if (response.data.success)
    return { data: response.data.data, meta: response.data.meta };
  throw new Error("Error obteniendo recolecciones");
};

export const getRecoleccionByIdRequest = async (
  id: string | number,
): Promise<Recoleccion> => {
  const response = await apiClient.get<ApiResponse<Recoleccion>>(
    `/recolecciones/${id}`,
  );
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar la recolección");
};

export const createRecoleccionRequest = async (
  data: CreateRecoleccionDTO,
): Promise<ApiResponse<Recoleccion>> => {
  const response = await apiClient.post<ApiResponse<Recoleccion>>(
    "/recolecciones",
    data,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando recolección");
};

export const updateRecoleccionRequest = async (
  id: number | string,
  data: UpdateRecoleccionDTO,
): Promise<Recoleccion> => {
  const response = await apiClient.put<ApiResponse<Recoleccion>>(
    `/recolecciones/${id}`,
    data,
  );
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar la recolección");
};

export const deleteRecoleccionRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/recolecciones/${id}`,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando recolección");
};
