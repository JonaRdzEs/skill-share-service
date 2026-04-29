import { Request, Response, NextFunction } from "express";
import z, { ZodObject } from "zod";
import { HTTPStatusCode, ErrorCode } from "../../../types";
import { HTTPError } from "../../../helpers/HTTPError";

export function authValidator(schema: ZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    const validationResp = schema.safeParse(req.body);

    if (!validationResp.success) {
      next(
        new HTTPError(
          HTTPStatusCode.badRequest,
          z.prettifyError(validationResp.error),
          ErrorCode.validation
        )
      );
      return;
    }

    next();
  };
}
