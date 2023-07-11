import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../services/user'; // Update the path accordingly

interface LoginResponse {
  message: string;
  id_user: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login!: string;
  password!: string;
  loginResponse: LoginResponse | undefined = undefined;

  constructor(private http: HttpClient, private userService: UserService) {}

  handleLogin() {
    const requestBody = {
      login: this.login,
      password: this.password,
    };

    this.http.post('http://127.0.0.1:8000/login', requestBody).subscribe(
      (response:  any) => {
        this.loginResponse = response;
        this.userService.setUserId(response.id_user);
        console.log(this.loginResponse);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
