import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private UserService: UserService) {}

  login(login: string, password: string) {
    const requestBody = {
      login: login,
      password: password,
    };

    return this.http
      .post('http://localhost:8000/api/login', requestBody)
      .subscribe({
        next: async (response: any) => {
          this.UserService.setUser(response.id_user);
          return response;
        },
        error: (error: any) => {
          throw error;
        },
      });
  }
}
