import type { Request, Response } from "express";
import { SkillService } from "../../services/Skill.service";
import { CreateSkillsRequest, HTTPStatusCode, SearchSkillsRequest } from "../../types";

export class SkillsController {
  private skillService;

  constructor() {
    this.skillService = new SkillService();
  }

  search = async (req: Request, res: Response) => {
    const { query } = req as SearchSkillsRequest;
    const skillName = query.name ?? "";
    
    const skills = await this.skillService.search(skillName);

    res.status(HTTPStatusCode.success).send({
      skills,
    })
  };

  createMany = async (req: Request, res: Response) => {
    const skills = await this.skillService.create((req as CreateSkillsRequest).body.skills);

    res.status(HTTPStatusCode.success).send({
      skills: skills
    })
  };
};