import { prisma } from "../../lib/prisma";

export class SkillModel {
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
}
