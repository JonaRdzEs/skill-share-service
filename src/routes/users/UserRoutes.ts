import express, { type Router } from "express";
import { UserController } from "../../controllers/users/User.controller";
import { validateJwt } from "../../middlewares/validateJwt";
import { bodyValidator } from "../../middlewares/validators/bodyValidator";
import { updateUserSchema } from "../../schemas/users/updateUser.schema";
import { UserSkillsController } from "../../controllers/users/UserSkills.controller";
import { addUserSkillsSchema } from "../../schemas/users/addUserSkills.schema";

export class UserRoutes {
  private router: Router = express.Router();

  get routes() {
    const userController = new UserController();
    const userSkillsController = new UserSkillsController();

    this.router.get("/:id", validateJwt, userController.getUser);
    this.router.put("/me", validateJwt, bodyValidator(updateUserSchema), userController.update);

    this.router.post("/me/skills", validateJwt, bodyValidator(addUserSkillsSchema), userSkillsController.add)
    
    return this.router;
  }
}

