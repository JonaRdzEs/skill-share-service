import { prisma } from "../../lib/prisma";

export class SkillModel {
  search(skillName: string) {
    return prisma.skills.findMany({
      where: {
        name: {
          mode: "insensitive",
          contains: skillName,
        }
      }
    });
  }

  create(skills: string[]) {
    const skillsToInsert = skills.map((skill) => ({ name: skill }));
    return prisma.skills.createManyAndReturn({ data: skillsToInsert });
  }

  findManyByName(skills: string[]) {
    return prisma.skills.findMany({
      where: {
        name: {
          in: skills,
        },
      },
    });
  }

  findManyById(ids: number[]) {
    return prisma.skills.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
