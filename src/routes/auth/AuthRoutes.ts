import express, { type Router } from "express";
import { AuthController } from "../../controllers/auth/Auth.controller";

import { createUserValidator } from "../../middlewares/validators";

export class AuthRoutes {
  private router: Router = express.Router();

  get routes() {
    const authController = new AuthController();

    this.router.post("/sign-up", createUserValidator, authController.signup);

    return this.router;
  }
}