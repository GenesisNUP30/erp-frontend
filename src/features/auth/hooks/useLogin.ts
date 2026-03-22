import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authServices";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../../routes/routes";
import type { LoginRequest } from "../types/IAuth";

interface LoginFormData extends LoginRequest {
  remember: boolean;
}

export default function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    try {
      // 1. Llamada a la API
      const response = await loginRequest({
        login: data.login,
        password: data.password,
      });
      console.log("Respuesta API:", response);

      // 2. Guardar datos en el Store y LocalStorage
      setAuth(response.user, response.token, data.remember);

      // 3. Redirigir al Dashboard inmediatamente
      console.log("Navegando a:", ROUTES.DASHBOARD);
      navigate(ROUTES.DASHBOARD, { replace: true });

      return response;
    } catch (error) {
      console.error("Error en el proceso de Login:", error);
      throw error; // Re-lanzamos para que el formulario lo detecte
    }
  };

  return { login };
}
