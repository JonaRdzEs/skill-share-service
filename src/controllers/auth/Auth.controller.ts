import type { Response } from "express";
import { AuthService } from "../../services/Auth.service";
import {
  SignUpRequest,
  HTTPStatusCode,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
} from "../../types";

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
  }

  signupWithCredentials = async (req: SignUpRequest, res: Response<CreateUserResponse>) => {
    const user = await this.authService.signUpWithCredentials(req.body);

    res.status(HTTPStatusCode.created).send({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    });
  };

  loginWithCredentials = async (req: LoginRequest, res: Response<LoginResponse>) => {
    const { user, token } = await this.authService.loginWithCredentials(req.body);
    res.status(HTTPStatusCode.success).send({
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        photoUrl: user.photo,
      },
      token,
    });
  };
}
