import type { Request, Response } from "express";

export class UserController {
  getUser(req: Request, res: Response) {
    res.status(200).send({
      name: "John",
      age: 34,
    });
  }
}
