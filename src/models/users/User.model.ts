import { UsersWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import {
  CreateUserData,
  GetUserParams,
  GetUsersParams,
  UpdateUserData,
} from "../../types";

export class UserModel {
  async exists(key: string, value: string) {
    const user = await prisma.users.findFirst({ where: { [key]: value } });
    return !!user;
  }

  async isTeacher(userId: string) {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      }
    });

    return user?.role === "teacher";
  }

  async getTopRatedByRole({
    role,
    requesterId,
    queryParams = {},
  }: GetUsersParams) {
    const { name, page = 1, take = 10 } = queryParams;

    const where = {
      role,
      AND: {
        id: {
          not: requesterId,
        },
        ...(name && {
          username: {
            mode: "insensitive",
            contains: name,
          },
        }),
      },
    } satisfies UsersWhereInput;

    const [count, users] = await Promise.all([
      prisma.users.count({ where }),
      prisma.users.findMany({
        where,
        take,
        skip: (page - 1) * take,
        select: {
          id: true,
          photo: true,
          username: true,
          bio: true,
          user_skills: {
            select: {
              skill: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(count / take);

    return {
      users,
      totalPages,
      totalCount: count,
    };
  }

  findOneByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }

  findById(id: string, role?: "student" | "teacher") {
    return prisma.users.findUnique({
      where: {
        id,
        ...(role && {
          AND: {
            role,
          },
        }),
      },
    });
  }

  findTeacherById({ id, include }: GetUserParams) {
    const {
      userSkills = false,
      reviewTarget = false,
      reviewAuthor = false,
    } = include ?? {};
    return prisma.users.findUnique({
      where: {
        id,
          AND: {
            role: "teacher",
          },
      },
      include: {
        review_author: reviewAuthor,
        review_target: reviewTarget,
        ...(userSkills && {
          user_skills: {
            include: {
              skill: true,
            },
          },
        }),
      },
    });
  }

  create(data: CreateUserData) {
    return prisma.users.create({ data });
  }

  update(id: string, data: UpdateUserData) {
    return prisma.users.update({
      data,
      where: {
        id,
      },
    });
  }
}
