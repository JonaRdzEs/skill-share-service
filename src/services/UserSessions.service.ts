import { UserSessionsModel } from "../models/users/UserSessions.model";

export class UserSessionsService {
  private userSessionsModel;

  constructor() {
    this.userSessionsModel = new UserSessionsModel();
  }

  listScheduled = async (
    userId: string,
    params?: { take?: number; page?: number }
  ) => {
    const { sessions, ...rest } = await this.userSessionsModel.listScheduled({
      userId,
      ...params,
    });
    const formattedSessions = sessions.map(
      ({
        host_id,
        location,
        message,
        updatedAt,
        createdAt,
        ...rest
      }) => ({
        ...rest,
        hostId: host_id,
      })
    );
    return {
      sessions: formattedSessions,
      ...rest,
    };
  };
}
