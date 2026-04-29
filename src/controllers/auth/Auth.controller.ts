import type { Response } from "express";
import { AuthService } from "../../services/Auth.service";
import {
  CreateUserRequest,
  HTTPStatusCode,
  CreateUserResponse,
  LoginUserRequest,
} from "../../types";

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
  }

  signupWithCredentials = async (req: CreateUserRequest, res: Response<CreateUserResponse>) => {
    const { name: username, ...rest } = req.body;
    const user = await this.authService.signUpWithCredentials({
      username,
      ...rest,
    });

    res.status(HTTPStatusCode.created).send({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    });
  };

  loginWithCredentials = async (req: LoginUserRequest, res: Response) => {
    const data = await this.authService.loginWithCredentials(req.body);
    res.status(HTTPStatusCode.success).send(data);
  };
}
