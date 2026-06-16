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

export class AuthController {
  private authService;

  constructor() {
    this.authService = new AuthService();
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
    const { accessToken, refreshToken: refreshTokenResp } =
      await this.authService.refreshToken(requesterId, email, refreshToken);

    res.status(HTTPStatusCode.success).send({
      accessToken,
      refreshToken: refreshTokenResp,
    });
  };

  logout = async (req: Request, res: Response<{ message: string }>) => {
    const userId = (req as AuthenticatedRequest).user.id;
    await this.authService.logout(userId);

    res
      .status(HTTPStatusCode.success)
      .send({ message: "Logged out successfully " });
  };
}
