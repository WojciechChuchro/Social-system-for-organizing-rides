import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from 'src/types/user';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: LoginForm = {
    email: '',
    password: '',
  };
  hidePassword: boolean = true;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilityService: UtilityService,
  ) {}

  handleLogin(): void {
    this.loading = true;
    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        this.utilityService.showAlert(response.message, 'Close', 3000);
        this.authService.setLoginStatus(true);
        this.loading = false;
        this.router.navigate(['/about-us']);
      },
      error: (error) => {
        this.loading = false;
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
