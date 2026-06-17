import type { Request, Response } from "express";
import { SkillService } from "../../services/Skill.service";
import { CreateSkillsRequest, HTTPStatusCode } from "../../types";

export class SkillsController {
  private skillService;

  constructor() {
    this.skillService = new SkillService();
  }

  createMany = async (req: Request, res: Response) => {
    const skills = await this.skillService.create((req as CreateSkillsRequest).body.skills);

    res.status(HTTPStatusCode.success).send({
      skills: skills
    })
  } 
};