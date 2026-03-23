import apiClient from '../../../api/apiClient';

export const getWorkersRequest = async () => {
  const response = await apiClient.get('/trabajadores');
  return response.data;
};