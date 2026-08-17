import express, { type Router } from "express";

import { UserRoutes } from "./users/UserRoutes";
import { AuthRoutes } from "./auth/AuthRoutes";
import { SkillRoutes } from "./skills/SkillRoutes";
import { SessionRoutes } from "./sessions/SessionRoutes";

export class AppRoutes {
  private router: Router = express.Router();

  get routes() {

    this.router.use("/auth", (new AuthRoutes()).routes);
    this.router.use("/users",(new UserRoutes()).routes);
    this.router.use("/skills", (new SkillRoutes()).routes);
    this.router.use("/sessions", (new SessionRoutes()).routes);

    return this.router;
  }
}
