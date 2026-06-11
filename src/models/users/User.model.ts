import { prisma } from "../../lib/prisma";
import { CreateUserData, UpdateUserData } from "../../types";

export class UserModel {
  async exists(key: string, value: string) {
    const user = await prisma.users.findFirst({ where: { [key]: value } });
    return !!user;
  }

  findOneByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }

  findById(id: string) {
    return prisma.users.findUnique({ where: { id } });
  }

  create(data: CreateUserData) {
    return prisma.users.create({ data });
  }

  update(id: string, data: UpdateUserData) {
    return prisma.users.update({
      data,
      where: {
        id,
      }
    });
  } 
}
