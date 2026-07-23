import { HTTPError } from "../helpers/HTTPError";
import { UserModel } from "../models/users/User.model";
import {
  CreateUserData,
  GetUsersParams,
  HTTPErrorCode,
  HTTPStatusCode,
  UpdateUserData,
  TeacherSkillBDResp,
} from "../types";

export class UserService {
  private userModel;

  constructor() {
    this.userModel = new UserModel();
  }

  emailExists = async (email: string) => this.userModel.exists("email", email);

  getTopRatedByRole = async (params: GetUsersParams) => {
    const { users, totalCount, totalPages } =
      await this.userModel.getTopRatedByRole(params);

    const formattedUsers = users.map(
      ({ photo, user_skills, username, ...rest }) => ({
        ...rest,
        name: username,
        photoUrl: photo,
        skills: user_skills.map((userSkill) => userSkill.skill.name),
      })
    );

    return {
      users: formattedUsers,
      totalCount,
      totalPages,
    };
  };

  findTeacherById = async (id: string) => {
    const teacher = await this.userModel.findTeacherById({
      id,
      include: {
        userSkills: true,
        reviewTarget: true,
      },
    });

    if (!teacher) {
      throw new HTTPError(
        HTTPStatusCode.notFound,
        `Teacher with id '${id}' not found`,
        HTTPErrorCode.notFound
      );
    }

    const { user_skills, ...rest } = teacher;

    return {
      ...rest,
      skills: (user_skills as TeacherSkillBDResp[]).map((userSkill) => ({
        id: userSkill.id,
        createdAt: userSkill.createdAt,
        skill: userSkill.skill,
      })),
    };
  };

  findById = async (id: string, role?: "student" | "teacher") => {
    const user = await this.userModel.findById(id, role);

    if (!user) {
      throw new HTTPError(
        HTTPStatusCode.notFound,
        `User with id '${id}' not found`,
        HTTPErrorCode.notFound
      );
    }

    return user;
  };

  findByEmail = async (email: string) => {
    const user = await this.userModel.findOneByEmail(email);
    if (!user)
      throw new HTTPError(
        HTTPStatusCode.notFound,
        "The provided email is not registered",
        HTTPErrorCode.notFound
      );

    return user;
  };

  create = async (data: CreateUserData) => {
    return this.userModel.create(data);
  };

  update = async (id: string, data: UpdateUserData) => {
    await this.userModel.update(id, data);
    return {
      id,
      ...data,
    };
  };
}
