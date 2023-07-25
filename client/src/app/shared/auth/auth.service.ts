import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from 'src/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: LoginForm) {
    return this.http.post('http://127.0.0.1:8741/api/login_check', user);
  }
}
