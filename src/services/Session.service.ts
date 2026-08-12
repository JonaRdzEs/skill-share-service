import { HTTPError } from "../helpers/HTTPError";
import { SessionModel } from "../models/sessions/Session.model";
import { UserModel } from "../models/users/User.model";
import { CreateSessionBody, HTTPErrorCode, HTTPStatusCode } from "../types";

export class SessionService {
  private sessionModel;
  private userModel;

  constructor() {
    this.sessionModel = new SessionModel();
    this.userModel = new UserModel();
  }

  static isScheduledDateValid = (date: Date) => {
    const scheduledTime = date.getTime();
    const nowTime = new Date().getTime();

    return scheduledTime > nowTime;
  };

  create = async (hostId: string, data: CreateSessionBody) => {
    const teacher = await this.userModel.findTeacherById({ id: data.guestId, include: { userSkills: true } });

    if (!teacher) {
      throw new HTTPError(
        HTTPStatusCode.notFound,
        "The requested teacher does not exist",
        HTTPErrorCode.notFound
      );
    }

    const { role, user_skills } = teacher;

    if (role !== "teacher") {
      throw new HTTPError(
        HTTPStatusCode.badRequest,
        "The session should be requested to a teacher",
        HTTPErrorCode.badRequest
      );
    }

    const teacherRequestedSkill = user_skills.find(
      (userSkill) => userSkill.skill_id === data.skillId
    );

    if (!teacherRequestedSkill) {
      throw new HTTPError(
        HTTPStatusCode.badRequest,
        "The skill is not associated with that teacher",
        HTTPErrorCode.badRequest
      );
    }

    const scheduledTime = new Date(data.scheduledAt);

    if (scheduledTime.toString() === "Invalid Date") {
      throw new HTTPError(
        HTTPStatusCode.badRequest,
        "Provide a valid date time",
        HTTPErrorCode.badRequest
      );
    }

    if (!SessionService.isScheduledDateValid(scheduledTime)) {
      throw new HTTPError(
        HTTPStatusCode.badRequest,
        "The scheduled session should take place in the future",
        HTTPErrorCode.badRequest
      );
    }

    const session = await this.sessionModel.create({
      hostId,
      ...data,
    });
    
    return session;
  };
}
