export interface Users {
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

export interface Reviews {
  comment: string;
  rating: string;
}
export interface UserWithReviews extends Users {
  reviews: Reviews[];
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
  message: string;
}
export interface profileForm {
  email?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  password: string;
}
