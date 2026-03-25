import apiClient from "./apiClient";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { HTTP_ERROR_MESSAGES } from "../utils/errorTranslator";

apiClient.interceptors.request.use((config) => {
  const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
  let token = null;

  if (authData) {
    try {
      // 2. Parseamos el JSON porque Zustand guarda un objeto
      const parsed = JSON.parse(authData);
      // 3. Accedemos a state.token (así lo estructura Zustand)
      token = parsed.state?.token;
    } catch (e) {
      console.error("Error parseando auth-storage", e);
    }
  }

  console.log("Interceptor: Enviando token ->", token);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si no hay respuesta del servidor (error de red)
    if (!error.response) {
      return Promise.reject({ status: 500, message: "Error de conexión" });
    }
    const status = error.response?.status;

    // Extraemos los mensajes de Laravel si existen
    const serverMessage = error.response?.data?.message;
    const validationErrors = error.response?.data?.errors;

    const customError = {
      status,
      message:
        serverMessage || HTTP_ERROR_MESSAGES[status] || "Error inesperado",
      errors: validationErrors, // Aquí van los errores de DNI duplicado, etc.
    };

    return Promise.reject(customError);
  },
);
