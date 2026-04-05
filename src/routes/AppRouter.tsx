import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./routes";
import LoginPage from "../features/auth/pages/LoginPage";
import MainLayout from "../components/layouts/MainLayout";
import WorkersPage from "../features/workers/pages/WorkersPage";
import WorkerDetailsPage from "../features/workers/pages/WorkerDetailsPage";
import WorkerEditPage from "../features/workers/pages/WorkerEditPage";


export default function AppRouter() {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />

      {/* Públicas */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.WORKERS} element={<WorkersPage />} />
          <Route path={ROUTES.WORKER_DETAILS} element={<WorkerDetailsPage />} />
          <Route path={ROUTES.WORKER_EDIT} element={<WorkerEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
