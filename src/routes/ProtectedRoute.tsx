import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import { ROUTES } from "./routes";

export default function ProtectedRoute() {
    const { token, isHydrated } = useAuthStore();

    if (!isHydrated) return null;

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return <Outlet />;
}