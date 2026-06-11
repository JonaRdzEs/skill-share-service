import express, { type Router } from "express";
import { UserController } from "../../controllers/users/User.controller";
import { validateJwt } from "../../middlewares/validateJwt";
import { bodyValidator } from "../../middlewares/validators/bodyValidator";
import { updateUserSchema } from "../../schemas/users/updateUser.schema";

export class UserRoutes {
  private router: Router = express.Router();

  get routes() {
    const userController = new UserController();

    this.router.get("/:id", validateJwt, userController.getUser);
    this.router.put("/me", validateJwt, bodyValidator(updateUserSchema), userController.update);
    
    return this.router;
  }
}

