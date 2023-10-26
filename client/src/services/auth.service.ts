import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginForm,
  MessageResponseOnly,
  RegisterForm,
  UserWithReviews,
} from 'src/types/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenValidationResponse } from '../types/response';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiBaseUrl: string;
  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  setLoginStatus(isLoggedIn: boolean): void {
    this.loginStatusSubject.next(isLoggedIn);
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get<TokenValidationResponse>(`${this.apiBaseUrl}/auth/validate-jwt`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          return response.isValid;
        }),
      );
  }

  login(user: LoginForm): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(
      `${this.apiBaseUrl}/auth/login`,
      user,
      { withCredentials: true },
    );
  }

  register(user: RegisterForm): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(
      `${this.apiBaseUrl}/auth/register`,
      user,
    );
  }

  logout(): Observable<MessageResponseOnly> {
    return this.http.get<MessageResponseOnly>(
      `${this.apiBaseUrl}/auth/logout`,
      { withCredentials: true },
    );
  }

  getUserWithJwtCookie(): Observable<UserWithReviews> {
    return this.http.get<UserWithReviews>(`${this.apiBaseUrl}/user`, {
      withCredentials: true,
    });
  }
}
