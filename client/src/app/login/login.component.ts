import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login!: string;
  password!: string;
  // repeatPassword!: string;

  constructor(private http: HttpClient) {}

  handleLogin() {
    const requestBody = {
      login: this.login,
      password: this.password,
    };

    this.http.post('http://127.0.0.1:8000/login', requestBody).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
