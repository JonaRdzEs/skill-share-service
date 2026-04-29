import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "./User.service";
import { HTTPError } from "../helpers/HTTPError";
import {
  HTTPErrorCode,
  HTTPStatusCode,
  LoginCredentials,
  SignUpData,
} from "../types";
import { envs } from "../constants";

export class AuthService {
  private saltRounds;
  private userService;
  private jwtKey;

  constructor() {
    this.saltRounds = 12;
    this.userService = new UserService();
    this.jwtKey = envs.jwtSecret;
  }

  encryptPassword = (password: string) =>
    bcrypt.hash(password, this.saltRounds);

  generateJWT = (payload: string | Buffer | object) => {
    return jwt.sign(payload, this.jwtKey, { expiresIn: "1hr" });
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

  loginWithCredentials = async (data: LoginCredentials) => {
    const user = await this.userService.findByEmail(data.email);
    // TODO: check logic
    const passwordsMatched = await bcrypt.compare(
      data.password,
      user.password!
    );

    if (!passwordsMatched)
      throw new HTTPError(
        HTTPStatusCode.forbidden,
        "Invalid credentials",
        HTTPErrorCode.forbidden
      );

    const jwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = this.generateJWT(jwtPayload);

    return {
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        bio: user.bio,
        location: user.location,
        photoUrl: user.photo,
      },
      token,
    };
  };
}
