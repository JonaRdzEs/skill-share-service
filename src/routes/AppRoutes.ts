import express, { type Router } from "express";

import { UserRoutes } from "./users/UserRoutes";
import { AuthRoutes } from "./auth/AuthRoutes";

export class AppRoutes {
  private router: Router = express.Router();

  get routes() {

    this.router.get("/", (req, res) => res.send("Hello world!!!"));
    this.router.use("/auth", (new AuthRoutes()).routes);
    this.router.use("/users",(new UserRoutes()).routes);
    
    return this.router;
  }
}
