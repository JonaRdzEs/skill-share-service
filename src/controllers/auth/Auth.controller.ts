import type { Response } from "express";
import { UserService } from "../../services/User.service";
import { CreateUserRequest, HTTPStatusCode, CreateUserResponse } from "../../types";

export class AuthController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  signup = async (req: CreateUserRequest, res: Response<CreateUserResponse>) => {
    const { name: username, email } = req.body;
    const user = await this.userService.create({ username, email });
    
    res.status(HTTPStatusCode.created).send({
      message: "User created successfully",
      user: {
        id: user.id,
        name: username, 
        email: email,
      }
    })
  }
}