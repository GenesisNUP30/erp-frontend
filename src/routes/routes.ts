export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login', // Ruta para el login
  DASHBOARD: '/dashboard', // Ruta para el dashboard
  WORKERS: '/trabajadores', // Ruta para la lista
  WORKER_DETAILS: '/trabajadores/detalles/:id', // Ruta para el detalle
  WORKER_EDIT: '/trabajadores/editar/:id', // Ruta para el editar
} as const;