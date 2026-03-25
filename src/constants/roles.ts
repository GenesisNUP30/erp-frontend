export const ROLES = {
  ADMIN: 'administrador',
  ENCARGADO: 'encargado',
  RECOLECTOR: 'recolector',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];