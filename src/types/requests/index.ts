import type { Request } from "express";
import type { LoginData, SignUpData } from "../auth";
import { UpdateUserData } from "../users";

/* Auth */
export interface SignUpRequest extends Request {
  body: SignUpData;
}

export interface LoginRequest extends Request {
  body: LoginData;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export interface RefreshTokenRequest extends Request {
  user: {
    id: string;
    email: string;
    refreshToken: string;
  };
}

/* Users */
export interface GetUserRequest extends AuthenticatedRequest {
  params: {
    id: string;
  },
}

export interface UpdateUserRequest extends AuthenticatedRequest {
  body: UpdateUserData
}

export interface AddUserSkillsRequest extends AuthenticatedRequest {
  body: {
    skillIds: number[],
  }
}

export interface DeleteUserSkillsRequest extends AuthenticatedRequest {
  body: {
    userSkillIds: number[],
  }
}

/* Skills */
export interface CreateSkillsRequest extends AuthenticatedRequest {
  body: {
    skills: string[]
  }
}