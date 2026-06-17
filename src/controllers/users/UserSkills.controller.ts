import { Request, Response } from "express";
import { AddUserSkillsRequest, HTTPStatusCode } from "../../types";
import { UserSkillsService } from "../../services/UserSkills.service";

export class UserSkillsController {
  private userSkillsService;

  constructor() {
    this.userSkillsService = new UserSkillsService();
  }

  add = async (req: Request, res: Response) => {
    const { user, body } = req as AddUserSkillsRequest;

    const skills = await this.userSkillsService.add(user.id, body.skillIds);

    res.status(HTTPStatusCode.success).send({
      skills,
    });
  };
}
