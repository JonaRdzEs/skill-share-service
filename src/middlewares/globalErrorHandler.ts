import type { ErrorRequestHandler } from "express";
import { HTTPError } from "../helpers/HTTPError";
import { HTTPStatusCode, ErrorCode, HTTPErrorCode } from "../types";
import { envs } from "../constants";

// ALL four arguments should be there so Express jumps here when an error occurs
export const globalErrorHandler: ErrorRequestHandler = (err: Error | HTTPError, req, res, next) => {
  let statusCode: HTTPStatusCode = HTTPStatusCode.serverError;
  let code: ErrorCode | HTTPErrorCode = HTTPErrorCode.serverError;


  if(err instanceof HTTPError) {
    statusCode = err.statusCode;
    code = err.code;
  }

  if(envs.environment === "development") console.log(err);

  res.status(statusCode).send({
    code,
    message: err.message
  })
};