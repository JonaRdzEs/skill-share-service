import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { AuthModel } from "../models/auth/Auth.model";
import { UserService } from "./User.service";
import { HTTPError } from "../helpers/HTTPError";
import { HTTPErrorCode, HTTPStatusCode, LoginData, SignUpData } from "../types";
import { envs, JWT_EXPIRE_TIME, REFRESH_TOKEN_EXPIRE_TIME } from "../constants";

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
    this.refreshTokenSecret = envs.refreshTokenSecret,
    this.refreshTokenExpireTime = REFRESH_TOKEN_EXPIRE_TIME;
  }

  encryptPassword = (password: string) =>
    bcrypt.hash(password, this.saltRounds);

  generateJWT = (payload: JwtPayload) => jwt.sign(payload, this.jwtKey, { expiresIn: this.jwtExpireTime } as SignOptions );

  generateRefreshToken = (payload: JwtPayload) => jwt.sign(payload, this.refreshTokenSecret, { expiresIn: this.refreshTokenExpireTime } as SignOptions);

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

    const jwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = this.generateJWT(jwtPayload);
    const refreshToken = this.generateRefreshToken(jwtPayload);

    await this.authModel.saveRefreshToken(user.id, refreshToken);
    
    return {
      user,
      accessToken: token,
      refreshToken,
    };
  };
}
