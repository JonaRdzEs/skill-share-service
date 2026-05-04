import "dotenv/config";

const JWT_EXPIRE_TIME = "2h";
const REFRESH_TOKEN_EXPIRE_TIME = "10d";

const envs  = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET ?? "",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? "",
  dbUrl: process.env.DATABASE_URL,
}

export {
  envs,
  JWT_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
}

