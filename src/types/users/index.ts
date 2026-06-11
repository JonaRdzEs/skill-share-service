export interface CreateUserData {
  username: string;
  email: string;
  password?: string | null;
  bio?: string | null;
  location?: string | null;
  photo?: string | null;
}

export interface UpdateUserData {
  username?: string;
  bio?: string;
  location: string;
  photo?: string;
}
