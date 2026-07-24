import z from "zod";

export const addUserSkillsSchema = z.object({
  skillIds: z.array(z.number()).min(1),
});
