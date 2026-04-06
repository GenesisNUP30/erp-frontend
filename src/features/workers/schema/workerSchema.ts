import { z } from "zod";
import v from "../../../validations/validations";
import type { Role } from "../../../constants/roles";

// 1. Esquema base (lo común)
const baseWorkerSchema = z.object({
  name: z
    .string()
    .min(1, v.createForm.errors.nameRequired)
    .max(60, v.createForm.errors.nameMaxLength),
  dni: z
    .string()
    .min(1, v.createForm.errors.dniRequired)
    .regex(/^[0-9]{8}[A-Z]$/, v.createForm.errors.dniInvalid),
  telefono: z
    .string()
    .min(1, v.createForm.errors.phoneRequired)
    .regex(/^[67][0-9]{8}$/, v.createForm.errors.phoneInvalid),
  rol: z.string().min(1, v.createForm.errors.roleRequired) as z.ZodType<Role>,
  fecha_alta: z.string().min(1, v.createForm.errors.dateRequired),
  username: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .email(v.createForm.errors.emailInvalid)
    .optional()
    .or(z.literal("")),
});

// 2. Esquema específico para CREAR (Password Obligatoria)
export const createWorkerSchema = baseWorkerSchema
  .extend({
    password: z.string().min(1, v.createForm.errors.passwordRequired).min(8, v.createForm.errors.passwordMin),
  })
  .refine((data) => data.username || data.email, {
    message: "Usuario o Email obligatorio",
    path: ["username"],
  });

// 3. Esquema específico para EDITAR (Password Opcional)
export const updateWorkerSchema = baseWorkerSchema
  .extend({
    password: z
      .string()
      .min(8, v.createForm.errors.passwordMin)
      .optional()
      .or(z.literal("")),
    fecha_baja: z.string().nullable().optional(),
  })
  .refine((data) => data.username || data.email, {
    message: "Usuario o Email obligatorio",
    path: ["username"],
  });

export type WorkerFormData = z.infer<typeof createWorkerSchema> & {
    fecha_baja?: string | null;
};
