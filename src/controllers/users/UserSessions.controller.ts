import { Request, Response } from "express";
import { HTTPStatusCode, GetUserSessionsRequest } from "../../types";
import { UserSessionsService } from "../../services/UserSessions.service";

export class UserSessionsController {
  private userSessionsService;

  constructor() {
    this.userSessionsService = new UserSessionsService();
  }

  list = async (req: Request, res: Response) => {
    const { query, user } = req as GetUserSessionsRequest;

    const page = isNaN(parseInt(query.page ?? ""))
      ? 1
      : parseInt(query.page!, 10);
    const take = isNaN(parseInt(query.take ?? ""))
      ? 10
      : parseInt(query.take!, 10);

    const sessionsResponse = await this.userSessionsService.listScheduled(
      user.id,
      {
        page,
        take,
      }
    );
    res.status(HTTPStatusCode.success).send({
      ...sessionsResponse,
    });
  };
}
