import { prisma } from "../../lib/prisma";

export class UserSkillsModel {
  getByUserId(userId: string) {
    return prisma.userSkills.findMany({
      where: {
        user_id: userId,
      }, 
      include: {
        skill: {
          select: {
            name: true,
          }
        }
      }
    });
  }

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

  delete(userId: string, userSkillIds: number[]) {
    return prisma.userSkills.deleteMany({
      where: {
        user_id: userId,
        AND: {
          id: {
            in: userSkillIds,
          }
        }
      }
    });
  }
}
