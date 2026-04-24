import express, { type Router } from "express";
import { UserController } from "../../controllers/users/User.controller";

export class UserRoutes {
  private router: Router = express.Router();

  get routes() {
    const userController = new UserController();

    this.router.use("/", userController.getUser);
    
    return this.router;
  }
}

