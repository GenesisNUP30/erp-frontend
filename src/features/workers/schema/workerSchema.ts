import { z } from "zod";
import v from "../../../validations/validations";
import type { Role } from "../../../constants/roles";

export const workerSchema = z
  .object({
    name: z
      .string()
      .min(1, v.createForm.errors.nameRequired)
      .max(60, v.createForm.errors.nameMaxLength),
    username: z.string().optional().or(z.literal("")),
    email: z
      .string()
      .email(v.createForm.errors.emailInvalid)
      .optional()
      .or(z.literal("")),
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
    password: z
      .string()
      .min(8, v.createForm.errors.passwordMin)
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.username || data.email, {
    message:v.createForm.errors.usernameEmailRequired,
    path: ["username"], 
  });

export type WorkerFormData = z.infer<typeof workerSchema>;
