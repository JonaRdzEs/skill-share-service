import z from "zod";
import { loginWithCredentialsSchema } from "./loginWithCredentials.schema";

export const signUpWithCredentialsSchema = loginWithCredentialsSchema.extend({
  name: z.string().min(3, "Name should have at least 3 characters").max(50, "Name should have less than 50 characters"),
});
