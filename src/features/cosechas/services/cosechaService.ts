import apiClient from "../../../api/apiClient";
import type {
  Cosecha,
  CreateCosechaDTO,
  UpdateCosechaDTO,
  CosechaSelectOption,
} from "../types/ICosechas";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export const getCosechasRequest = async (
  page = 1,
  perPage = 5,
): Promise<{ data: Cosecha[]; meta: any }> => {
  const response = await apiClient.get<ApiResponse<Cosecha[]>>(
    `/cosechas?page=${page}&per_page=${perPage}`,
  );
  if (response.data.success)
    return { data: response.data.data, meta: response.data.meta };
  throw new Error("Error obteniendo cosechas");
};

export const getCosechaByIdRequest = async (
  id: string | number,
): Promise<Cosecha> => {
  const response = await apiClient.get<ApiResponse<Cosecha>>(`/cosechas/${id}`);
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar la cosecha");
};

export const createCosechaRequest = async (
  data: CreateCosechaDTO,
): Promise<ApiResponse<Cosecha>> => {
  const response = await apiClient.post<ApiResponse<Cosecha>>(
    "/cosechas",
    data,
  );
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando cosecha");
};

export const updateCosechaRequest = async (
  id: number | string,
  data: UpdateCosechaDTO,
): Promise<Cosecha> => {
  const response = await apiClient.put<ApiResponse<Cosecha>>(
    `/cosechas/${id}`,
    data,
  );
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar la cosecha");
};

export const deleteCosechaRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/cosechas/${id}`);
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando cosecha");
};

export const getCosechasActivasRequest = async (): Promise<
  CosechaSelectOption[]
> => {
  const response =
    await apiClient.get<ApiResponse<CosechaSelectOption[]>>(
      "/cosechas/activas",
    );
  if (response.data.success) return response.data.data;
  throw new Error("Error obteniendo cosechas activas");
};
