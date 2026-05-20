import type { Role } from "../constants/roles";
import { ROUTES } from "./routes";

export interface MenuItem {
  title: string;
  path: string;
  icon: string;
  roles: Role[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: "Dashboard",
    roles: ["administrador", "encargado", "recolector"],
  },
  {
    title: "Trabajadores",
    path: ROUTES.WORKERS,
    icon: "People",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Parcelas",
    path: ROUTES.PARCELAS,
    icon: "GridView",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Variedades",
    path: ROUTES.VARIEDADES,
    icon: "ListAlt",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Campañas",
    path: ROUTES.CAMPANIAS,
    icon: "Event",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Plantaciones",
    path: ROUTES.PLANTACIONES,
    icon: "Toys",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Cosechas",
    path: ROUTES.COSECHAS,
    icon: "Agriculture",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Recolecciones",
    path: ROUTES.RECOLECCIONES,
    icon: "Inventory",
    roles: ["administrador", "encargado"],
  },
  {
    title: "Horas trabajadas",
    path: ROUTES.HORAS_TRABAJADAS,
    icon: "AccessTime",
    roles: ["administrador", "encargado", "recolector"],
  },
  {
    title: "Pagos",
    path: ROUTES.PAGOS,
    icon: "Payments",
    roles: ["administrador", "encargado", "recolector"],
  },
];
