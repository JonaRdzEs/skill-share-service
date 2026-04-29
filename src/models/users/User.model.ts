import { prisma } from "../../lib/prisma";

export class UserModel {
  async exists (key: string, value: string) {
    const user = await prisma.users.findFirst({ where: { [key]: value }});
    return !!user;
  }

  findOneByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }

  findById(id: string) {
    return prisma.users.findUnique({ where: { id } })
  }

  create(data: { username: string; email: string; password?: string }) {
    return prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
      },
    });
  }
}
