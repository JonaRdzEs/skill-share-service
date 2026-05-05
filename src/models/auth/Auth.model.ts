import { prisma } from "../../lib/prisma";
import { REFRESH_TOKEN_EXPIRE_TIME } from "../../constants";

type TokenExpiredResult = { is_expired: boolean }; 

export class AuthModel {
  saveRefreshToken(userId: string, token: string) {
    return prisma.$executeRaw`UPDATE "public"."Users" SET "refreshToken" = ${token}, token_expire_date = NOW() + (${REFRESH_TOKEN_EXPIRE_TIME})::interval WHERE id=${userId};`;
  }

  async isTokenExpired(userId: string, token: string) {
    const result = await prisma.$queryRaw<TokenExpiredResult[]>`SELECT token_expire_date < NOW() AS is_expired FROM "public"."Users" WHERE "refreshToken" = ${token} AND id = ${userId};`;
    return result[0]?.is_expired ?? false;
  }

  deleteRefreshToken(userId: string, token?: string) {
    return prisma.users.update({
      data: {
        refreshToken: null,
        token_expire_date: null,
      },
      where: {
        id: userId,
        ...(token && { refreshToken: token }),
      }
    })
  }
}
