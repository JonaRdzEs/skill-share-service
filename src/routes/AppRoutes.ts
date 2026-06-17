import express, { type Router } from "express";

import { UserRoutes } from "./users/UserRoutes";
import { AuthRoutes } from "./auth/AuthRoutes";
import { SkillRoutes } from "./skills/SkillRoutes";

export class AppRoutes {
  private router: Router = express.Router();

  get routes() {

    this.router.use("/auth", (new AuthRoutes()).routes);
    this.router.use("/users",(new UserRoutes()).routes);
    this.router.use("/skills", (new SkillRoutes()).routes);

    return this.router;
  }
}
