import { Request, Response } from "express";
import { AddUserSkillsRequest, DeleteUserSkillsRequest, HTTPStatusCode } from "../../types";
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

  delete = async (req: Request, res: Response) => {
    const { user, body } = req as DeleteUserSkillsRequest;

    const { count } = await this.userSkillsService.delete(user.id, body.userSkillIds);
    res.status(HTTPStatusCode.success).send({
      message: `${count} ${count > 1 ? "items" : "item"} deleted`
    })
  }
}
