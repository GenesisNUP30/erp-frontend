export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login", // Ruta para el login
  DASHBOARD: "/dashboard", // Ruta para el dashboard

  // Workers
  WORKERS: "/trabajadores", // Ruta para la lista
  WORKER_DETAILS: "/trabajadores/detalles/:id", // Ruta para el detalle
  WORKER_EDIT: "/trabajadores/editar/:id", // Ruta para el editar

  // Parcelas
  PARCELAS: "/parcelas", // Ruta para la lista
  PARCELA_DETAILS: "/parcelas/detalles/:id", // Ruta para el detalle
  PARCELA_EDIT: "/parcelas/editar/:id", // Ruta para el editar
} as const;
