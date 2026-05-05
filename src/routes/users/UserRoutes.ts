import express, { type Router } from "express";
import { UserController } from "../../controllers/users/User.controller";
import { validateJwt } from "../../middlewares/validateJwt";

export class UserRoutes {
  private router: Router = express.Router();

  get routes() {
    const userController = new UserController();

    this.router.get("/", validateJwt, userController.getUser);
    
    return this.router;
  }
}

