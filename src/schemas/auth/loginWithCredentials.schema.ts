import z from "zod";

export const loginWithCredentialsSchema = z.object({
  email: z.email("Invalid email"),
});
