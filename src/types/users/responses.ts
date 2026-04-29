export interface CreateUserResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
