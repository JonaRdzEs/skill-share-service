import { NextFunction, Response, Request } from "express";
import { AuthService } from "../services/Auth.service";
import { HTTPError } from "../helpers/HTTPError";
import { HTTPErrorCode, HTTPStatusCode, AuthenticatedRequest } from "../types";

export function validateJwt(req: Request, res: Response, next: NextFunction) {
  const jwtToken = req.cookies["access_token"];

  if (!jwtToken) {
    next(
      new HTTPError(
        HTTPStatusCode.unauthorized,
        "Authorization failed. No access token provided",
        HTTPErrorCode.unauthorized
      )
    );
    return;
  }

  try {
    const authService = new AuthService();

    const { userId: id, email } = authService.verifyToken(jwtToken, "access");
    (req as AuthenticatedRequest).user = { id, email };
    next();
  } catch (error) {
    next(error);
  }
}
