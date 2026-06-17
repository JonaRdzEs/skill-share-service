import { SkillModel } from "../models/skills/Skill.model";
import { UserSkillsModel } from "../models/users/UserSkills.model"

export class UserSkillsService {
  private userSkillsModel;
  private skillModel;

  constructor () {
    this.userSkillsModel = new UserSkillsModel();
    this.skillModel = new SkillModel();
  }

  add = async (userId: string, skillIds: number[]) => {
    const existingSkillIds = await this.skillModel.findManyById(skillIds);

    if(existingSkillIds.length === 0) return [];

    const ids = existingSkillIds.map((s) => s.id);
    const addedSkills = await this.userSkillsModel.create(userId, ids);
    return addedSkills.map(({ id, description, skill }) => ({ userSkillId: id, description, name:  skill.name }));
  }
}