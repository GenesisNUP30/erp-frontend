import { z } from 'zod';
import v from '../../../validations/validations';

export const workerSchema = z.object({
  name: z
  .string()
  .min(1, v.createForm.errors.nameRequired)
  .max(60, v.createForm.errors.nameMaxLength),
  username: z.string().min(1, v.generic.required),
  email: z.string().email(v.createForm.errors.emailInvalid),
  dni: z
  .string()
  .regex(/^[0-9]{8}[A-Z]$/, v.createForm.errors.dniInvalid),
  telefono: z
  .string()
  .regex(/^[67][0-9]{8}$/, v.createForm.errors.phoneInvalid),
  rol: z.string().min(1, v.createForm.errors.roleRequired),
  fecha_alta: z.string().min(1, v.createForm.errors.dateRequired),
  password: z
  .string()
  .min(8, v.createForm.errors.passwordMin)
  .optional()
  .or(z.literal('')),
});

export type WorkerFormData = z.infer<typeof workerSchema>;