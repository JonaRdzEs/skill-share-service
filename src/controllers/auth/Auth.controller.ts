import type { Request, Response } from "express";
import { AuthService } from "../../services/Auth.service";
import {
  SignUpRequest,
  HTTPStatusCode,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RefreshTokenRequest,
} from "../../types";
import { envs } from "../../constants";

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
  }

  signupWithCredentials = async (
    req: SignUpRequest,
    res: Response<CreateUserResponse>
  ) => {
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

  loginWithCredentials = async (
    req: LoginRequest,
    res: Response<LoginResponse>
  ) => {
    const { user, accessToken, refreshToken } =
      await this.authService.loginWithCredentials(req.body);
    res.cookie("refresh-token", refreshToken, {
      httpOnly: envs.environment === "production",
      secure: envs.environment === "production",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });
    res.status(HTTPStatusCode.success).send({
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        photoUrl: user.photo,
      },
      accessToken,
      refreshToken,
    });
  };

  refreshToken = async (req: Request, res: Response<RefreshTokenResponse>) => {
    const {
      id: requesterId,
      refreshToken,
      email,
    } = (req as RefreshTokenRequest).user;
    const tokens = await this.authService.refreshToken(
      requesterId,
      email,
      refreshToken
    );

    res.status(HTTPStatusCode.success).send({
      ...tokens,
    });
  };
}
