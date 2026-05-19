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

  // Variedades
  VARIEDADES: "/variedades", // Ruta para la lista
  VARIEDAD_DETAILS: "/variedades/detalles/:id", // Ruta para el detalle
  VARIEDAD_EDIT: "/variedades/editar/:id", // Ruta para el editar

  // Campañas
  CAMPANIAS: "/campanias", // Ruta para la lista
  CAMPANIA_DETAILS: "/campanias/detalles/:id", // Ruta para el detalle
  CAMPANIA_EDIT: "/campanias/editar/:id", // Ruta para el editar

  // Plantaciones
  PLANTACIONES: "/plantaciones", // Ruta para la lista
  PLANTACION_DETAILS: "/plantaciones/detalles/:id", // Ruta para el detalle
  PLANTACION_EDIT: "/plantaciones/editar/:id", // Ruta para el editar

  // Cosechas
  COSECHAS: "/cosechas",
  COSECHA_DETAILS: "/cosechas/detalles/:id",
  COSECHA_EDIT: "/cosechas/editar/:id",

  // Recolecciones
  RECOLECCIONES: "/recolecciones",
  RECOLECCION_DETAILS: "/recolecciones/detalles/:id",
  RECOLECCION_EDIT: "/recolecciones/editar/:id",

  // Horas Trabajadas
  HORAS_TRABAJADAS: "/horas-trabajadas",
  HORAS_DETAILS: "/horas-trabajadas/detalles/:id",
  HORAS_EDIT: "/horas-trabajadas/editar/:id",

  // Pagos
  PAGOS: "/pagos",
  PAGO_DETAILS: "/pagos/detalles/:id",
  PAGO_EDIT: "/pagos/editar/:id",
} as const;
