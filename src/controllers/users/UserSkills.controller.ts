import { Request, Response } from "express";
import { AddUserSkillsRequest, DeleteUserSkillsRequest, HTTPStatusCode, GetUserSkillsRequest } from "../../types";
import { UserSkillsService } from "../../services/UserSkills.service";

export class UserSkillsController {
  private userSkillsService;

  constructor() {
    this.userSkillsService = new UserSkillsService();
  }

  get = async (req: Request, res: Response) => {
    const { params, user } = req as GetUserSkillsRequest;
    const userId = params.id.toLowerCase() === "me" ? user.id : params.id;

    const userSkills = await this.userSkillsService.getByUser(userId);

    res.status(HTTPStatusCode.success).send({
      user: {
        id: userId,
        skills: userSkills,
      }
    });
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
