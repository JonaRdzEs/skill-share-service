import { prisma } from "../../lib/prisma";

export class UserSkillsModel {
  create(userId: string, skillIds: number[]) {
    
    const formattedData = skillIds.map((skillId) => ({
      user_id: userId,
      skill_id: skillId,
    }));

    return prisma.userSkills.createManyAndReturn({
      data: formattedData,
      skipDuplicates: true,
      include: {
        skill: {
          select: {
            name: true,
          }
        }
      }
    });
  }
}
