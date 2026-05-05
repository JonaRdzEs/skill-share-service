import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { AuthModel } from "../models/auth/Auth.model";
import { UserService } from "./User.service";
import { HTTPError } from "../helpers/HTTPError";
import {
  HTTPErrorCode,
  HTTPStatusCode,
  LoginData,
  SignUpData,
  JwtPayload,
} from "../types";
import { envs, JWT_EXPIRE_TIME, REFRESH_TOKEN_EXPIRE_TIME } from "../constants";

interface DecodedJwtPayload extends JwtPayload {
  iat: number;
  exp: number;
}

export class AuthService {
  private userService;
  private authModel;

  private saltRounds;
  private jwtKey;
  private jwtExpireTime;
  private refreshTokenSecret;
  private refreshTokenExpireTime;

  constructor() {
    this.userService = new UserService();
    this.authModel = new AuthModel();

    this.saltRounds = 12;
    this.jwtKey = envs.jwtSecret;
    this.jwtExpireTime = JWT_EXPIRE_TIME;
    this.refreshTokenSecret = envs.refreshTokenSecret;
    this.refreshTokenExpireTime = REFRESH_TOKEN_EXPIRE_TIME;
  }

  verifyToken = (token: string, type: "refresh" | "access") => {
    const secret = type === "access" ? this.jwtKey : this.refreshTokenSecret;
    try {
      return jwt.verify(token, secret) as DecodedJwtPayload;
    } catch (error) {
      throw new HTTPError(
        HTTPStatusCode.badRequest,
        "Invalid token",
        HTTPErrorCode.badRequest
      );
    }
  };

  encryptPassword = (password: string) =>
    bcrypt.hash(password, this.saltRounds);

  generateToken = (payload: JwtPayload, type: "refresh" | "access") => {
    const expiresIn =
      type === "access" ? this.jwtExpireTime : this.refreshTokenExpireTime;
    const secret = type === "access" ? this.jwtKey : this.refreshTokenSecret;

    return jwt.sign(payload, secret, {
      expiresIn,
    } as SignOptions);
  };

  signUpWithCredentials = async (data: SignUpData) => {
    const { password, ...rest } = data;
    const isEmailRegistered = await this.userService.emailExists(data.email);

    if (isEmailRegistered)
      throw new HTTPError(
        HTTPStatusCode.badRequest,
        "This email is already registered",
        HTTPErrorCode.badRequest
      );

    const encryptedPass = await this.encryptPassword(password);

    return this.userService.create({ ...rest, password: encryptedPass });
  };

  loginWithCredentials = async (data: LoginData) => {
    const user = await this.userService.findByEmail(data.email);

    const passwordsMatched = await bcrypt.compare(
      data.password,
      user.password!
    );

    if (!passwordsMatched)
      throw new HTTPError(
        HTTPStatusCode.unauthorized,
        "Invalid credentials",
        HTTPErrorCode.unauthorized
      );

    const jwtPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = this.generateToken(jwtPayload, "access");
    const refreshToken = this.generateToken(jwtPayload, "refresh");

    await this.authModel.saveRefreshToken(user.id, refreshToken);

    return {
      user,
      accessToken: token,
      refreshToken,
    };
  };

  refreshToken = async (userId: string, userEmail: string, refreshToken: string) => {
    const isTokenExpired = await this.authModel.isTokenExpired(
      userId,
      refreshToken
    );

    if (isTokenExpired) {
      await this.authModel.deleteRefreshToken(userId, refreshToken);
      throw new HTTPError(
        HTTPStatusCode.forbidden,
        "Refresh token was expired",
        HTTPErrorCode.forbidden
      );
    }

    const payload: JwtPayload = {
      email: userEmail,
      userId,
    };

    const newAccessToken = this.generateToken(payload, "access");

    return { accessToken: newAccessToken, refreshToken };
  };
}
