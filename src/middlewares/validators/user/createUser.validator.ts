import { Response, NextFunction } from "express";
import z from "zod";
import { createUserSchema } from "../../../schemas/users/createUser.schema";
import { HTTPStatusCode, ErrorCode, CreateUserRequest } from "../../../types";
import { HTTPError } from "../../../helpers/HTTPError";

export function createUserValidator(req: CreateUserRequest, res: Response, next: NextFunction) {
  const validationResp = createUserSchema.safeParse(req.body);
  
  if(!validationResp.success) {
    next(new HTTPError(HTTPStatusCode.badRequest, z.prettifyError(validationResp.error), ErrorCode.validation))
    return;
  }

  next();
}