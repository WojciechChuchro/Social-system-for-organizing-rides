export interface User {
  id: number;
  modelId: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  profilePicture: string;
  password: string;
  sessionToken: string;
  salt: string;
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

export interface MessageResponseOnly {
  message: string
}
export interface profileForm  {
  email?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  password: string;
}
