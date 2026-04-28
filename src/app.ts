import express, { type Application } from "express";
import { AppRoutes } from "./routes/AppRoutes";
import { envs } from "./constants";

const app: Application = express();
const { port } = envs;
const appRoutes = new AppRoutes();

app.use(express.json());
app.use("/", appRoutes.routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
