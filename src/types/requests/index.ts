import type { Request } from "express";
import type { LoginData, SignUpData } from "../auth";

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