import express, { type Router } from "express";
import { UserController } from "../../controllers/users/User.controller";
import { validateJwt } from "../../middlewares/validateJwt";
import { bodyValidator } from "../../middlewares/validators/bodyValidator";
import { updateUserSchema } from "../../schemas/users/updateUser.schema";
import { UserSkillsController } from "../../controllers/users/UserSkills.controller";
import { addUserSkillsSchema } from "../../schemas/users/addUserSkills.schema";
import { deleteUserSkillsSchema } from "../../schemas/users/deleteUserSkills.schema";
import { UserSessionsController } from "../../controllers/users/UserSessions.controller";

export class UserRoutes {
  private router: Router = express.Router();

  get routes() {
    const userController = new UserController();
    const userSkillsController = new UserSkillsController();
    const userSessionsController = new UserSessionsController();

    this.router.get("/teachers/top-rated", validateJwt, userController.getTopRatedTeachers);
    this.router.get("/:id", validateJwt, userController.getUser);
    this.router.put("/me", validateJwt, bodyValidator(updateUserSchema), userController.update);

    this.router.get("/:id/skills", validateJwt, userSkillsController.get);
    this.router.post("/me/skills", validateJwt, bodyValidator(addUserSkillsSchema), userSkillsController.add);
    this.router.delete("/me/skills", validateJwt, bodyValidator(deleteUserSkillsSchema), userSkillsController.delete);
    
    this.router.get("/me/sessions", validateJwt, userSessionsController.list);
    
    return this.router;
  }
}

