import apiClient from "../../../api/apiClient";
import type {
  Plantacion,
  CreatePlantacionDTO,
  UpdatePlantacionDTO,
  SelectOption,
} from "../types/IPlantaciones";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export const getPlantacionesRequest = async (
  page = 1,
  perPage = 5,
): Promise<{ data: Plantacion[]; meta: any }> => {
  const response = await apiClient.get<ApiResponse<Plantacion[]>>(
    `/plantaciones?page=${page}&per_page=${perPage}`,
  );
  if (response.data.success)
    return { data: response.data.data, meta: response.data.meta };
  throw new Error("Error obteniendo plantaciones");
};

export const getPlantacionByIdRequest = async (
  id: string | number,
): Promise<Plantacion> => {
  const response = await apiClient.get<ApiResponse<Plantacion>>(
    `/plantaciones/${id}`,
  );
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar la plantación");
};

export const createPlantacionRequest = async (
  data: CreatePlantacionDTO,
): Promise<ApiResponse<Plantacion>> => {
  const response = await apiClient.post<ApiResponse<Plantacion>>(
    "/plantaciones",
    data,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando plantación");
};

export const updatePlantacionRequest = async (
  id: number | string,
  data: UpdatePlantacionDTO,
): Promise<Plantacion> => {
  const response = await apiClient.put<ApiResponse<Plantacion>>(
    `/plantaciones/${id}`,
    data,
  );
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar la plantación");
};

export const deletePlantacionRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/plantaciones/${id}`,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando plantación");
};

// Selects
export const getParcelasActivasRequest = async (): Promise<SelectOption[]> => {
  const response =
    await apiClient.get<ApiResponse<SelectOption[]>>("/parcelas/activas");
  if (response.data.success) return response.data.data;
  throw new Error("Error obteniendo parcelas");
};

export const getVariedadesRequest = async (): Promise<SelectOption[]> => {
  const response =
    await apiClient.get<ApiResponse<SelectOption[]>>("/variedades/todas");
  if (response.data.success) return response.data.data;
  throw new Error("Error obteniendo variedades");
};

export const getCampaniasActivasRequest = async (): Promise<SelectOption[]> => {
  const response =
    await apiClient.get<ApiResponse<SelectOption[]>>("/campanias/activas");
  if (response.data.success) return response.data.data;
  throw new Error("Error obteniendo campañas");
};
