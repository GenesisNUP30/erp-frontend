import { z } from 'zod';

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'El campo es obligatorio')
    .max(255, 'Máximo 255 caracteres'),

  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(255, 'Máximo 255 caracteres'),

  remember: z.boolean(),
});