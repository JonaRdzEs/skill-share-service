import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AppRoutes } from "./routes/AppRoutes";
import { envs } from "./constants";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();
const { port } = envs;
const appRoutes = new AppRoutes();

const corsOptions = {
  origin: envs.environment === "development" ? ["http://localhost:3000"] : ["https://skill-share-murex.vercel.app"],
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());

app.use("/", appRoutes.routes);
app.options('/*wildcard', cors(corsOptions)); // Enable CORS for preflight requests

// The error handler MUST be the last middleware defined
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
