import { Request, Response, NextFunction } from "express";
import z from "zod";
import { createUserSchema } from "../../../schemas/users/createUser.schema";
import { HTTPError } from "../../../helpers/HTTPError";

export function createUserValidator(req: Request, res: Response, next: NextFunction) {
  const validationResp = createUserSchema.safeParse(req.body);
  
  if(validationResp.success) {
    next();
    return;
  }

  const formattedErrorMsg = z.prettifyError(validationResp.error);
  res.status(400).send({
    code: "VALIDATION_ERROR",
    message: formattedErrorMsg,
  });
  //next(new HTTPError(200, formattedErrorMsg, "VALIDATION_ERROR"));
}