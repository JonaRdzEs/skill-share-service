import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;'"|\\<,>.?/~`]).{8,}$/),
});