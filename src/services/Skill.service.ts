import { SkillModel } from "../models/skills/Skill.model";

export class SkillService {
  private skillModel;

  constructor() {
    this.skillModel = new SkillModel();
  }

  create = async (skills: string[]) => {
    const existingSkills = await this.skillModel.findManyByName(skills);

    // no duplicated skills
    if (existingSkills.length === 0) {
      return this.skillModel.create(skills);
    }

    // otherwise filter and add ONLY new skills
    const existingSkillNames = existingSkills.map((skill) => skill.name);
    const newSkills = skills.filter(
      (skill) => !existingSkillNames.includes(skill)
    );

    const insertedSkills = await this.skillModel.create(newSkills);

    return [...insertedSkills, ...existingSkills];
  };
}
