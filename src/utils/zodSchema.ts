import { z } from "zod";

export const AppointmentSchema = z.object({
  id: z.string(),
  date: z.string(),
  userId: z.string(),
  status: z.boolean(),
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().trim().min(3),
  password: z.string().trim().min(6),
  appointments: z.array(AppointmentSchema).optional(),
});

export type Appointment = z.infer<typeof AppointmentSchema>;
export type User = z.infer<typeof UserSchema>;
