import { Response } from "express";
import { envs } from "../constants";

interface Options {
  response: Response;
  name: string;
  value: string;
  expirationTime?: number;
}

export function setCookie({
  response,
  name,
  value,
  expirationTime = 10 * 60 * 1000,
}: Options) {
  response.cookie(name, value, {
    httpOnly: true,
    secure: envs.environment === "production",
    sameSite: envs.environment === "production"
      ? "none"
      : "lax",
    maxAge: expirationTime,
  });
}
