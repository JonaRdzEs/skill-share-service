import type { Request, Response } from "express";

export class AuthController {
  signup (req: Request, res: Response) {
    const { name: username, email } = req.body;
    res.status(201).send({
      message: "User created successfully",
      user: {
        name: username, 
        email: email,
      }
    })
  }
}