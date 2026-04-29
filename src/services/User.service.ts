import { UserModel } from "../models/users/User.model";

export class UserService {
  private userModel;

  constructor() {
    this.userModel = new UserModel();
  }

  create = async (data: { username: string; email: string }) => {
    return this.userModel.create(data);
  };
}
