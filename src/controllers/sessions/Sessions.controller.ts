import { Request, Response } from "express";
import { SessionService } from "../../services/Session.service";
import { CreateSessionRequest, HTTPStatusCode } from "../../types";

export class SessionsController {
  private sessionService;

  constructor() {
    this.sessionService = new SessionService();
  }

  create = async (req: Request, res: Response) => {
    const { user, body } = req as CreateSessionRequest;
    const hostId = user.id;

    const session = await this.sessionService.create(hostId, body);

    const { host_id, guest_id, skill_id, ...rest } = session;
    
    res.status(HTTPStatusCode.success).send({
      session: {
        ...rest,
        hostId: host_id,
        guestId: guest_id,
        skillId: skill_id,
      },
    });
  };
}
