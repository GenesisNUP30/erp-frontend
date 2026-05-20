import apiClient from "../../../api/apiClient";
import type {
  Pago,
  CreatePagoDTO,
  UpdatePagoDTO,
  BorradorPago,
} from "../types/IPagos";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export const getPagosRequest = async (
  page = 1,
  perPage = 5,
): Promise<{ data: Pago[]; meta: any }> => {
  const response = await apiClient.get<ApiResponse<Pago[]>>(
    `/pagos?page=${page}&per_page=${perPage}`,
  );
  if (response.data.success)
    return { data: response.data.data, meta: response.data.meta };
  throw new Error("Error obteniendo pagos");
};

export const getPagoByIdRequest = async (
  id: string | number,
): Promise<Pago> => {
  const response = await apiClient.get<ApiResponse<Pago>>(`/pagos/${id}`);
  if (response.data.success) return response.data.data;
  throw new Error("No se pudo cargar el pago");
};

export const createPagoRequest = async (
  data: CreatePagoDTO,
): Promise<ApiResponse<Pago>> => {
  const response = await apiClient.post<ApiResponse<Pago>>("/pagos", data);
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error creando pago");
};

export const updatePagoRequest = async (
  id: number | string,
  data: UpdatePagoDTO,
): Promise<Pago> => {
  const response = await apiClient.put<ApiResponse<Pago>>(`/pagos/${id}`, data);
  if (response.data.success) return response.data.data;
  throw new Error("Error al actualizar el pago");
};

export const deletePagoRequest = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/pagos/${id}`);
  if (response.data.success) return response.data;
  throw new Error(response.data.message || "Error eliminando pago");
};

export const generarBorradorRequest = async (
  userId: number,
  mes: number,
  anio: number,
): Promise<BorradorPago> => {
  const response = await apiClient.get<ApiResponse<BorradorPago>>(
    `/pagos/generar-borrador?user_id=${userId}&mes=${mes}&anio=${anio}`,
  );
  if (response.data.success) return response.data.data;
  throw new Error(
    response.data.message || "No hay horas sin pago para este período",
  );
};
