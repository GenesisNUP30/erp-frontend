export const ROLES = {
  ADMIN: 'admin',
  ENCARGADO: 'encargado',
  RECOLECTOR: 'recolector',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];