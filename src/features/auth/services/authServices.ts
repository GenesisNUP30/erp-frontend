import apiClient from '../../../api/apiClient';
import type { LoginRequest, AuthResponse } from '../types/IAuth';

export const loginRequest = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post('/login', data);

  return response.data;
};