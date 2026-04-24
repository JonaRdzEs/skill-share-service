import express, { type Application } from "express";
import { AppRoutes } from "./routes/AppRoutes";

const app: Application = express();
const port = 3010;

const appRoutes = new AppRoutes();

app.use("/", appRoutes.routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
