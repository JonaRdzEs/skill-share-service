import { UserInfoDBResp } from "../../types";

interface UserInfo  {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  bio: string | null;
  location: string | null;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UserView {
  format(user: UserInfoDBResp): UserInfo {
    const { id, bio, createdAt, updatedAt, email, username, location, photo, role } = user; 

    return {
      id,
      name: username,
      email,
      role,
      bio,
      location,
      photoUrl: photo,
      createdAt,
      updatedAt,
    }
  }
}