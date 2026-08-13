import z from "zod";

export const createSessionSchema = z.object({
  scheduledAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, "Date should be formatted in ISO 8601"),
  duration: z.number("The duration should be a number").min(5, "The min duration of a session is five minutes"),
  location: z.url({ protocol: /^https?$/, error: "Location should ve a valid URL" }),
  message: z.string().optional(),
  guestId: z.uuidv4(),
  skillId: z.number().min(1).optional(),
});