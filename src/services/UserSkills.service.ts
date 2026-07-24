import { HTTPError } from "../helpers/HTTPError";
import { SkillModel } from "../models/skills/Skill.model";
import { UserSkillsModel } from "../models/users/UserSkills.model";
import { HTTPErrorCode, HTTPStatusCode } from "../types";

export class UserSkillsService {
  private userSkillsModel;
  private skillModel;

  constructor() {
    this.userSkillsModel = new UserSkillsModel();
    this.skillModel = new SkillModel();
  }

  getByUser = async (userId: string) => {
    const userSkills = await this.userSkillsModel.getByUserId(userId);

    return userSkills.map(({ user_id, skill, skill_id, ...rest }) => ({
      ...rest,
      skill: {
        id: skill_id,
        name: skill.name,
      }
     }));
  };

  add = async (userId: string, skillIds: number[]) => {
    const existingSkillIds = await this.skillModel.findManyById(skillIds);

    if (existingSkillIds.length === 0) return [];

    const ids = existingSkillIds.map((s) => s.id);
    const addedSkills = await this.userSkillsModel.create(userId, ids);
    return addedSkills.map(({ id, description, skill, createdAt }) => ({
      userSkillId: id,
      description,
      name: skill.name,
      createdAt,
    }));
  };

  delete = async (userId: string, userSkillIds: number[]) => {
    const response = await this.userSkillsModel.delete(userId, userSkillIds);

    if (response.count === 0)
      throw new HTTPError(
        HTTPStatusCode.notFound,
        "Provided user skills ids do not exist",
        HTTPErrorCode.notFound
      );

    return response;
  };
}
