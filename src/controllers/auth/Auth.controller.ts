import type { Request, Response } from "express";
import { HTTPStatusCode } from "../../types";

export class AuthController {
  signup (req: Request, res: Response) {
    const { name: username, email } = req.body;
    res.status(HTTPStatusCode.created).send({
      message: "User created successfully",
      user: {
        name: username, 
        email: email,
      }
    })
  }
}