import type { Request } from "express";

export interface CreateUserRequest extends Request {
  params: {
    id: string,
  }
  body: {
    name: string,
    email: string,
  }
}