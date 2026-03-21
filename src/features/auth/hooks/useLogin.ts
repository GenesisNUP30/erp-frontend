import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authServices";
import { useAuthStore } from "../store/authStore";
import { ROUTES } from "../../../routes/routes";

export default function useLogin() {
    const  setAuth = useAuthStore((state) => state.setAuth);
    const navigate = useNavigate();

    const login = async (data: any) => {
        const response = await loginRequest(data);
        setAuth(response.user, response.token, data.remember);
        navigate(ROUTES.DASHBOARD);
        return response;
    };

    return { login };
}