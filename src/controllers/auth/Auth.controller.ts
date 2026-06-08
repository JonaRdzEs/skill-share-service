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
  AuthenticatedRequest,
} from "../../types";
import { setCookie } from "../../utils/setCookie";
import { envs } from "../../constants";

export class AuthController {
  private authService;
  private accessOptions;
  private refreshOptions;

  constructor() {
    this.authService = new AuthService();
    this.accessOptions = {
      name: "access_token",
      expirationTime: 20 * 60 * 1000, // 20 minutes
    };

    this.refreshOptions = {
      name: "refresh_token",
      expirationTime: 10 * 60 * 60 * 60 * 1000, // 10 days
    };
  }

  signupWithCredentials = async (
    req: SignUpRequest,
    res: Response<CreateUserResponse>
  ) => {
    const {
      id,
      username: name,
      email,
    } = await this.authService.signUpWithCredentials(req.body);

    res.status(HTTPStatusCode.created).send({
      message: "User created successfully",
      user: {
        id,
        name,
        email,
      },
    });
  };

  loginWithCredentials = async (
    req: LoginRequest,
    res: Response<LoginResponse>
  ) => {
    const { user, accessToken, refreshToken } =
      await this.authService.loginWithCredentials(req.body);
    setCookie({
      response: res,
      value: refreshToken,
      ...this.refreshOptions,
    });
    setCookie({
      response: res,
      value: accessToken,
      ...this.accessOptions,
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

    setCookie({
      response: res,
      value: tokens.refreshToken,
      ...this.refreshOptions,
    });
    setCookie({
      response: res,
      value: tokens.accessToken,
      ...this.accessOptions,
    });

    res.status(204);
  };

  logout = async (req: Request, res: Response<{ message: string }>) => {
    const userId = (req as AuthenticatedRequest).user.id;
    await this.authService.logout(userId);
    res.clearCookie(this.accessOptions.name, {
      httpOnly: true,
      secure: envs.environment === "production",
    });
    res.clearCookie(this.refreshOptions.name, {
      httpOnly: true,
      secure: envs.environment === "production",
    });
    res
      .status(HTTPStatusCode.success)
      .send({ message: "Logged out successfully " });
  };
}
