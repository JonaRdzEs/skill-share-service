import type { Response } from "express";
import { SkillService } from "../../services/Skill.service";
import { CreateSkillsRequest, HTTPStatusCode } from "../../types";

export class SkillsController {
  private skillService;

  constructor() {
    this.skillService = new SkillService();
  }

  createMany = async (req: CreateSkillsRequest, res: Response) => {
    const skills = await this.skillService.create(req.body.skills);

    res.status(HTTPStatusCode.success).send({
      skills: skills
    })
  } 
};