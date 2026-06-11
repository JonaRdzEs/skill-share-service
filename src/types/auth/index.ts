export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData extends LoginData {
  username: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}
