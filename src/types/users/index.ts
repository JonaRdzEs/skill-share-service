export interface CreateUserData {
  username: string;
  email: string;
  password?: string | null;
  bio?: string | null;
  location?: string | null;
  photo?: string | null;
}

export interface UpdateUserData {
  username?: string;
  bio?: string;
  location: string;
  photo?: string;
  role?: "student" | "teacher";
}

export interface GetUsersParams {
  role: "student" | "teacher";
  requesterId: string;
  queryParams?: {
    name?: string;
    page?: number;
    take?: number;
  };
}

export interface GetUserParams {
  id: string;
  include?: {
    userSkills?: boolean;
    reviewTarget?: boolean;
    reviewAuthor?: boolean;
  };
}

export interface TeacherSkillBDResp {
  id: number;
  createdAt: Date;
  description: string | null;
  user_id: string;
  skill_id: number;
  skill: {
    id: number;
    name: string;
  };
}

export interface UserInfoDBResp {
  role: "student" | "teacher";
  id: string;
  username: string;
  email: string;
  password: string | null;
  bio: string | null;
  location: string | null;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string | null;
  token_expire_date: Date | null;
}
