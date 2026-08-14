import { prisma } from "../../lib/prisma";

export class UserSessionsModel {
  async listScheduled({
    userId,
    take = 10,
    page = 1,
  }: {
    userId: string;
    take?: number;
    page?: number;
  }) {
    await this.checkAndUpdateExpiry(userId);

    const [count, scheduledSessions] = await Promise.all([
      prisma.sessions.count({ where: { host_id: userId } }),
      prisma.sessions.findMany({
        where: {
          host_id: userId,
        },
        include: {
          skill: true,
          guest: {
            select: {
              id: true,
              username: true,
            }
          }
        },
        omit: {
          skill_id: true,
          guest_id: true,
        },
        take,
        skip: (page - 1) * take,
        orderBy: {
          scheduledAt: "asc",
        }
      }),
    ]);

    const totalPages = Math.ceil(count / take);

    return {
      sessions: scheduledSessions,
      totalCount: count,
      totalPages,
    };
  }

  async checkAndUpdateExpiry(userId: string) {
    await prisma.$executeRaw`UPDATE "public"."Sessions" SET "status" = 'EXPIRED' WHERE "scheduledAt" <= NOW()::TIMESTAMPTZ  AND "host_id"=${userId} OR "guest_id"=${userId};`;
  }
}
