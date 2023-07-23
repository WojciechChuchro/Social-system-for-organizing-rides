import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  handleLogin() {
    // Implement your login logic here
    console.log('Login data:', {
      email: this.email,
      password: this.password,
    });
  }
}
