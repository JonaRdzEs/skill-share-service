import type { Request } from "express";
import type { LoginCredentials } from "../auth/credentials";

export interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface LoginUserRequest extends Request {
  body: LoginCredentials;
}
