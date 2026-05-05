import express, { type Router } from "express";
import { AuthController } from "../../controllers/auth/Auth.controller";

import { authValidator } from "../../middlewares/validators";
import { signUpWithCredentialsSchema } from "../../schemas/auth/signUpWithCredentials.schema";
import { loginWithCredentialsSchema } from "../../schemas/auth/loginWithCredentials.schema";
import { validateRefreshToken } from "../../middlewares/validateRefreshToken";

export class AuthRoutes {
  private router: Router = express.Router();

  get routes() {
    const authController = new AuthController();

    this.router.post("/sign-up", authValidator(signUpWithCredentialsSchema), authController.signupWithCredentials);
    this.router.post("/login", authValidator(loginWithCredentialsSchema), authController.loginWithCredentials);
    this.router.post("/refresh-token", validateRefreshToken, authController.refreshToken);

    return this.router;
  }
}