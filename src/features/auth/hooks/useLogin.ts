import { loginRequest } from "../services/authServices";
import { useAuthStore } from "../store/authStore";

export default function useLogin() {
    const  setAuth = useAuthStore((state) => state.setAuth);

    const login = async (data: any) => {
        const response = await loginRequest(data);
        setAuth(response.user, response.token, data.remember);
        return response;
    };

    return { login };
}