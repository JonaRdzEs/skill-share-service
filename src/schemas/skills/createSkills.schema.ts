import z from "zod";

export const createSkillsSchema = z.object({
  skills: z.array(z.string()).min(1),
});