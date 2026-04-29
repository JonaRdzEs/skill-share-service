import "dotenv/config";

const envs  = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET ?? "",
}

export {
  envs,
}

