import { HTTPErrorCode, ErrorCode, HTTPStatusCode} from "../types";

export class HTTPError extends Error {

  statusCode: HTTPStatusCode;
  code: ErrorCode | HTTPErrorCode;

  constructor(statusCode: HTTPStatusCode, message: string, code?: ErrorCode | HTTPErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.code = code ?? ErrorCode.default;
  
    // Captures the point in the code where the error was instantiated
    Error.captureStackTrace(this, this.constructor);
  }
  
}