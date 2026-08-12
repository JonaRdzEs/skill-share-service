import z from "zod";

export const createSessionSchema = z.object({
  scheduledAt: z.string(),
  duration: z.number().min(5, "The min duration of a session is five minutes"),
  location: z.string(),
  message: z.string().optional(),
  guestId: z.uuidv4(),
  skillId: z.number().min(1),
});