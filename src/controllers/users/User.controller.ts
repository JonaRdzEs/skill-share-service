import type { Request, Response } from "express";
import {
  AuthenticatedRequest,
  GetUserRequest,
  HTTPStatusCode,
  GetUsersRequest,
} from "../../types";
import { UserView } from "../../views/users/User.view";
import { UserService } from "../../services/User.service";

export class UserController {
  private userService;
  private userView;

  constructor() {
    this.userService = new UserService();
    this.userView = new UserView();
  }

  getTopRatedTeachers = async (req: Request, res: Response) => {
    const { query, user } = req as GetUsersRequest;

    const page = isNaN(parseInt(query.page ?? ""))
      ? 1
      : parseInt(query.page!, 10);
    const take = isNaN(parseInt(query.take ?? ""))
      ? 10
      : parseInt(query.take!, 10);

    const { users, ...rest } = await this.userService.getTopRatedByRole({
      role: "teacher",
      requesterId: user.id,
      queryParams: {
        ...(query.name && { name: query.name }),
        page,
        take,
      },
    });

    res.status(HTTPStatusCode.success).send({
      teachers: users,
      ...rest,
    });
  };

  getUser = async (req: Request, res: Response) => {
    const { params, query, user } = req as GetUserRequest;
    const queryRole = query.role?.toLowerCase();
    const userId = params.id.toLowerCase() === "me" ? user.id : params.id;

    const userRole =
      queryRole === "student" || queryRole === "teacher"
        ? (queryRole as "student" | "teacher")
        : undefined;

    if (userRole === "teacher") {
      const { skills, review_target, review_author, ...rest } =
        await this.userService.findTeacherById(userId);

      const { createdAt, updatedAt, ...restTeacher } =
        this.userView.format(rest);

      res.status(HTTPStatusCode.success).send({
        teacher: {
          ...restTeacher,
          skills,
          targetReviews: review_target,
        },
      });
      return;
    }

    const userResp = await this.userService.findById(userId, userRole);

    res.status(HTTPStatusCode.success).send({
      user: this.userView.format(userResp),
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
