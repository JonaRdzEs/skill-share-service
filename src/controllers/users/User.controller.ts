import type { Request, Response } from "express";
import {
  AuthenticatedRequest,
  GetUserRequest,
  HTTPStatusCode,
} from "../../types";
import { UserService } from "../../services/User.service";

export class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  getUser = async (req: Request, res: Response) => {
    const typedRequest = req as GetUserRequest;
    const userId =
      typedRequest.params.id.toLowerCase() === "me"
        ? typedRequest.user.id
        : typedRequest.params.id;

    const { id, email, username, bio, createdAt, updatedAt, location, photo, role } =
      await this.userService.findById(userId);

    res.status(HTTPStatusCode.success).send({
      user: {
        id,
        email,
        name: username,
        bio,
        location,
        role,
        photoUrl: photo,
        createdAt,
        updatedAt,
      },
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = (req as AuthenticatedRequest).user;
    const { photo, ...rest } = await this.userService.update(id, req.body);
    res.status(HTTPStatusCode.success).send({
      user: {
        ...rest,
        photoUrl: photo,
      },
    });
  };
}
