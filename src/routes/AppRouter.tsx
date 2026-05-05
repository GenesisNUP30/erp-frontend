import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./routes";
import LoginPage from "../features/auth/pages/LoginPage";
import MainLayout from "../components/layouts/MainLayout";
import WorkersPage from "../features/workers/pages/WorkersPage";
import WorkerDetailsPage from "../features/workers/pages/WorkerDetailsPage";
import WorkerEditPage from "../features/workers/pages/WorkerEditPage";
import ParcelasPage from "../features/parcelas/pages/ParcelasPage";
import ParcelaDetailPage from "../features/parcelas/pages/ParcelaDetailPage";
import ParcelaEditPage from "../features/parcelas/pages/ParcelaEditPage";
import CampaniasPage from "../features/campanias/pages/CampaniasPage";
import CampaniaDetailPage from "../features/campanias/pages/CampaniaDetailPage";
import CampaniaEditPage from "../features/campanias/pages/CampaniaEditPage";

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

          {/* Workers */}
          <Route path={ROUTES.WORKERS} element={<WorkersPage />} />
          <Route path={ROUTES.WORKER_DETAILS} element={<WorkerDetailsPage />} />
          <Route path={ROUTES.WORKER_EDIT} element={<WorkerEditPage />} />

          {/* Parcelas */}
          <Route path={ROUTES.PARCELAS} element={<ParcelasPage />} />
          <Route path={ROUTES.PARCELA_DETAILS} element={<ParcelaDetailPage />} />
          <Route path={ROUTES.PARCELA_EDIT} element={<ParcelaEditPage />} />

          {/* Campañas */}
          <Route path={ROUTES.CAMPANIAS} element={<CampaniasPage />} />
          <Route path={ROUTES.CAMPANIA_DETAILS} element={<CampaniaDetailPage />} />
          <Route path={ROUTES.CAMPANIA_EDIT} element={<CampaniaEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
