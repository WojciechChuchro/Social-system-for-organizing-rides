import { Component } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { LoginForm } from 'src/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: LoginForm = {
    email: '', // Initialize with empty string
    password: '', // Initialize with empty string
  };
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(private auth: AuthService) {}
  handleLogin() {
    console.log(this.loginForm);
    this.loading = true;
    this.auth.login(this.loginForm).subscribe({
      next: () => {
        alert('login successful');
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        alert('login failed');
      },
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
