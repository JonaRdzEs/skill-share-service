import { prisma } from "../../lib/prisma";
import { CreateSessionBody } from "../../types";

export class SessionModel {
  create(data: CreateSessionBody & { hostId: string }) {
    const { guestId, hostId, skillId, ...rest } = data;
    return prisma.sessions.create({
      data: {
        host_id: hostId,
        guest_id: guestId,
        skill_id: skillId,
        ...rest,
      },
    });
  }
}
