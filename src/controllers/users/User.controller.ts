import type { Request, Response } from "express";
import { AuthenticatedRequest, GetUserRequest, HTTPStatusCode } from "../../types";
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

    const { id, email, username, bio, createdAt, updatedAt, location, photo } =
      await this.userService.findById(userId);

    res.status(HTTPStatusCode.success).send({
      user: {
        id,
        email,
        name: username,
        bio,
        location,
        photoUrl: photo,
        createdAt,
        updatedAt,
      },
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = (req as AuthenticatedRequest).user;
    const user = await this.userService.update(id, req.body);
    res.status(HTTPStatusCode.success).send({ user });
  };
}
