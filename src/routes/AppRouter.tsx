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
import VariedadesPage from "../features/variedades/pages/VariedadesPage";
import VariedadDetailPage from "../features/variedades/pages/VariedadDetailPage";
import VariedadEditPage from "../features/variedades/pages/VariedadEditPage";
import CampaniasPage from "../features/campanias/pages/CampaniasPage";
import CampaniaDetailPage from "../features/campanias/pages/CampaniaDetailPage";
import CampaniaEditPage from "../features/campanias/pages/CampaniaEditPage";
import PlantacionesPage from "../features/plantaciones/pages/PlantacionesPage";
import PlantacionDetailPage from "../features/plantaciones/pages/PlantacionDetailPage";
import PlantacionEditPage from "../features/plantaciones/pages/PlantacionEditPage";
import CosechasPage from "../features/cosechas/pages/CosechasPage";
import CosechaDetailPage from "../features/cosechas/pages/CosechaDetailPage";
import CosechaEditPage from "../features/cosechas/pages/CosechaEditPage";
import RecoleccionesPage from "../features/recolecciones/pages/RecoleccionesPage";
import RecoleccionDetailPage from "../features/recolecciones/pages/RecoleccionDetailPage";
import RecoleccionEditPage from "../features/recolecciones/pages/RecoleccionEditPage";
import HorasTrabajadaPage from "../features/horas_trabajadas/pages/HorasTrabajadaPage";
import HorasDetailPage from "../features/horas_trabajadas/pages/HorasDetailPage";
import HorasEditPage from "../features/horas_trabajadas/pages/HorasEditPage";
import PagosPage from "../features/pagos/pages/PagosPage";
import PagoDetailPage from "../features/pagos/pages/PagoDetailPage";
import PagoEditPage from "../features/pagos/pages/PagoEditPage";

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
          <Route
            path={ROUTES.PARCELA_DETAILS}
            element={<ParcelaDetailPage />}
          />
          <Route path={ROUTES.PARCELA_EDIT} element={<ParcelaEditPage />} />

          {/* Variedades */}
          <Route path={ROUTES.VARIEDADES} element={<VariedadesPage />} />
          <Route
            path={ROUTES.VARIEDAD_DETAILS}
            element={<VariedadDetailPage />}
          />
          <Route path={ROUTES.VARIEDAD_EDIT} element={<VariedadEditPage />} />

          {/* Campañas */}
          <Route path={ROUTES.CAMPANIAS} element={<CampaniasPage />} />
          <Route
            path={ROUTES.CAMPANIA_DETAILS}
            element={<CampaniaDetailPage />}
          />
          <Route path={ROUTES.CAMPANIA_EDIT} element={<CampaniaEditPage />} />

          {/* Plantaciones */}
          <Route path={ROUTES.PLANTACIONES} element={<PlantacionesPage />} />
          <Route
            path={ROUTES.PLANTACION_DETAILS}
            element={<PlantacionDetailPage />}
          />
          <Route
            path={ROUTES.PLANTACION_EDIT}
            element={<PlantacionEditPage />}
          />
          {/* Cosechas */}
          <Route path={ROUTES.COSECHAS} element={<CosechasPage />} />
          <Route
            path={ROUTES.COSECHA_DETAILS}
            element={<CosechaDetailPage />}
          />
          <Route path={ROUTES.COSECHA_EDIT} element={<CosechaEditPage />} />

          {/* Recolecciones */}
          <Route path={ROUTES.RECOLECCIONES} element={<RecoleccionesPage />} />
          <Route
            path={ROUTES.RECOLECCION_DETAILS}
            element={<RecoleccionDetailPage />}
          />
          <Route
            path={ROUTES.RECOLECCION_EDIT}
            element={<RecoleccionEditPage />}
          />
          {/* Horas Trabajadas */}
          <Route
            path={ROUTES.HORAS_TRABAJADAS}
            element={<HorasTrabajadaPage />}
          />
          <Route path={ROUTES.HORAS_DETAILS} element={<HorasDetailPage />} />
          <Route path={ROUTES.HORAS_EDIT} element={<HorasEditPage />} />

          {/* Pagos */}
          <Route path={ROUTES.PAGOS} element={<PagosPage />} />
          <Route path={ROUTES.PAGO_DETAILS} element={<PagoDetailPage />} />
          <Route path={ROUTES.PAGO_EDIT} element={<PagoEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
