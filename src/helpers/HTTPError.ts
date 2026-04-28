export class HTTPError extends Error {

  statusCode: number;
  code: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code ?? "ERROR";
  
    // Captures the point in the code where the error was instantiated
    Error.captureStackTrace(this, this.constructor);
  }
  
}