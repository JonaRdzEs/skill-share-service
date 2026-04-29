import { HTTPError } from "../helpers/HTTPError";
import { UserModel } from "../models/users/User.model";
import { HTTPErrorCode, HTTPStatusCode } from "../types";

export class UserService {
  private userModel;

  constructor() {
    this.userModel = new UserModel();
  }

  emailExists = async (email: string) => {
    return this.userModel.exists("email", email);
  } 

  findByEmail = async (email: string) => {
    const user = await this.userModel.findOneByEmail(email);
    if (!user)
      throw new HTTPError(
        HTTPStatusCode.notFound,
        "user with provided email does not exist",
        HTTPErrorCode.notFound
      );

    return user;
  };

  create = async (data: {
    username: string;
    email: string;
    password?: string;
  }) => {
    return this.userModel.create(data);
  };
}
