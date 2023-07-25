export interface User {
  id_user: number;
  name: string;
  login: string;
  password: string;
  phone_number: string;
  profile_picture: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
