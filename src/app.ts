import express, { type Application } from "express";
import { AppRoutes } from "./routes/AppRoutes";
import { envs } from "./constants";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();
const { port } = envs;
const appRoutes = new AppRoutes();

app.use(express.json());
app.use("/", appRoutes.routes);

// The error handler MUST be the last middleware defined
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
