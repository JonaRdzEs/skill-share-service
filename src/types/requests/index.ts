import type { Request } from "express";
import type { LoginData, SignUpData } from "../auth";

/* Auth */
export interface SignUpRequest extends Request {
  body: SignUpData;
}

export interface LoginRequest extends Request {
  body: LoginData;
}

/* Users */