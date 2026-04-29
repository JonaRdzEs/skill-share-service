import type { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// This function takes the controller method and ensures
// any errors are caught and sent to the global error handler.
export function catchAsync(fn: AsyncFunction): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err));
  };
}
