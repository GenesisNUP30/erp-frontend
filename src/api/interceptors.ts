import apiClient from './apiClient';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { HTTP_ERROR_MESSAGES } from '../utils/errorTranslator';

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    
    // Extraemos los mensajes de Laravel si existen
    const serverMessage = error.response?.data?.message;
    const validationErrors = error.response?.data?.errors;

    const customError = {
      status,
      message: serverMessage || HTTP_ERROR_MESSAGES[status] || "Error inesperado",
      errors: validationErrors, // Aquí van los errores de DNI duplicado, etc.
    };

    return Promise.reject(customError);
  }
);