import express, { type Router } from "express";
import { SkillsController } from "../../controllers/skills/Skills.controller";
import { validateJwt } from "../../middlewares/validateJwt";
import { bodyValidator } from "../../middlewares/validators/bodyValidator";
import { createSkillsSchema } from "../../schemas/skills/createSkills.schema";

export class SkillRoutes {
  private router: Router = express.Router();

  get routes() {
    const skillsController = new SkillsController();

    this.router.get("/search", validateJwt, skillsController.search);
    this.router.post("/", validateJwt, bodyValidator(createSkillsSchema), skillsController.createMany);

    return this.router;
  }
}
