import z from "zod";
import { loginWithCredentialsSchema } from "./loginWithCredentials.schema";

export const signUpWithCredentialsSchema = loginWithCredentialsSchema.extend({
  username: z.string().min(3, "Name should have at least 3 characters").max(50, "Name should have less than 50 characters"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;'"|\\<,>.?/~`]).{8,}$/,
      "password should have at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character "
    ),
});
