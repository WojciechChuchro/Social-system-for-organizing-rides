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

export interface RegisterForm {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
}

export interface profileForm  {
  email?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  password: string;
}
