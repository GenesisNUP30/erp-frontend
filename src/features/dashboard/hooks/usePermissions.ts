import { ROLES } from "../../../constants/roles";
import { useAuthStore } from "../../auth/store/authStore";


export default function usePermissions() {
  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.rol === ROLES.ADMIN;
  const isEncargado = user?.rol === ROLES.ENCARGADO;

  return {
    // Trabajadores
    canCreateWorkers: isAdmin,
    canDeleteWorkers: isAdmin,

    // Parcelas
    canCreateParcelas: isAdmin,
    canDeleteParcelas: isAdmin,

    // Variedades
    canCreateVariedades: isAdmin,
    canDeleteVariedades: isAdmin,

    // Campañas
    canCreateCampanias: isAdmin,
    canDeleteCampanias: isAdmin,

    // Plantaciones
    canCreatePlantaciones: isAdmin || isEncargado,
    canDeletePlantaciones: isAdmin,

    // Cosechas
    canCreateCosechas: isAdmin,
    canDeleteCosechas: isAdmin,

    // Recolecciones
    canCreateRecolecciones: isAdmin || isEncargado,
    canDeleteRecolecciones: isAdmin,

    // Horas trabajadas
    canCreateHoras: isAdmin,
    canDeleteHoras: isAdmin,

    // Pagos
    canCreatePagos: isAdmin,
    canDeletePagos: isAdmin,
  };
}