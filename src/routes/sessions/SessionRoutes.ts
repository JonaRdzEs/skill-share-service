import express, { Router } from "express";
import { validateJwt } from "../../middlewares/validateJwt";
import { bodyValidator } from "../../middlewares/validators/bodyValidator";
import { createSessionSchema } from "../../schemas/sessions/createSession.schema";
import { SessionsController } from "../../controllers/sessions/Sessions.controller";

export class SessionRoutes {
  private router: Router = express.Router();

  get routes() {
    const sessionsController = new SessionsController();

    this.router.post("/", validateJwt, bodyValidator(createSessionSchema), sessionsController.create);

    return this.router;
  }

}