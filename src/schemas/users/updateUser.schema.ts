import z from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(3, "Name should have at least 3 characters").max(50, "Name should have less than 50 characters").optional(),
  bio: z.string().max(250, "Bio must have less that 250 characters").optional(),
  location: z.string().optional(),
  photo: z.string().optional(),
});