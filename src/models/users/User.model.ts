import { prisma } from "../../lib/prisma";

export class UserModel {
  create(data: { username: string, email: string }) {
    return prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
      }
    })
  }
}