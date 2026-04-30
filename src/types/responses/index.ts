export interface CreateUserResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    location: string | null;
    photoUrl: string | null;
  };
  token: string;
}
