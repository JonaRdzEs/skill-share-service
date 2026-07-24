import z from "zod";

export const deleteUserSkillsSchema = z.object({
  userSkillIds: z.array(z.number()).min(1),
});
