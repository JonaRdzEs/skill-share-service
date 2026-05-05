import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/Auth.service";
import { HTTPError } from "../helpers/HTTPError";
import { HTTPErrorCode, HTTPStatusCode, RefreshTokenRequest } from "../types";

export function validateRefreshToken(req: Request, res: Response, next: NextFunction) {
  const refreshToken: string = req.cookies["refresh-token"];

  if (!refreshToken) {
    next(
      new HTTPError(
        HTTPStatusCode.badRequest,
        "Invalid token",
        HTTPErrorCode.badRequest
      )
    );
    return;
  }

  try {
    const authService = new AuthService();
    const { userId: id, email } = authService.verifyToken(refreshToken, "refresh");
    
    (req as RefreshTokenRequest).user = {
      id,
      email,
      refreshToken,
    };
    next();
  } catch (error) {
    next(error);
  }
}
