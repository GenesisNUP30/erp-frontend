import { Routes, Route, Navigate } from 'react-router-dom';
//import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from './routes';
import LoginPage from '../features/auth/pages/LoginPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Redirección inicial */}
      <Route path='/' element={<Navigate to={ROUTES.LOGIN} />} />

      {/* Públicas */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} /> */}
      </Route>
    </Routes>
  );
}