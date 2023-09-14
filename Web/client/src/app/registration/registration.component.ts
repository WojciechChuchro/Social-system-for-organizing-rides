import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterForm } from '../../types/user';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registerForm: RegisterForm = {
    email: '',
    name: '',
    surname: '',
    phoneNumber: '',
    password: '',
  };
  repeatPassword: string = '';

  loading: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private utilityService: UtilityService,
  ) {}
  handleRegister(): void {
    if (this.registerForm.password !== this.repeatPassword) {
      this.utilityService.showAlert("Passwords don't match.", 'Close', 3000);
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm).subscribe({
      next: (response) => {
        this.utilityService.showAlert(response.message, 'Close', 3000);
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }
}
