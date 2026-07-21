import type { Request, Response } from "express";
import {
  AuthenticatedRequest,
  GetUserRequest,
  HTTPStatusCode,
  GetUsersRequest,
} from "../../types";
import { UserService } from "../../services/User.service";

export class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  getTopRatedTeachers = async (req: Request, res: Response) => {
    const { query, user } = req as GetUsersRequest;

    const page = isNaN(parseInt(query.page ?? "")) ? 1 : parseInt(query.page!, 10);
    const take = isNaN(parseInt(query.take ?? "")) ? 10 : parseInt(query.take!, 10);

    const { users, ...rest } = await this.userService.getTopRatedByRole({
      role: "teacher",
      requesterId: user.id,
      queryParams: {
        ...(query.name && { name: query.name }),
        page,
        take,
      }
    });

    res.status(HTTPStatusCode.success).send({
      teachers: users,
      ...rest, 
    })
  };

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
