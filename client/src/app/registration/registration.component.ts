import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../shared/auth/auth.service";
import {RegisterForm} from "../../types/user";

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
  }
  repeatPassword: string = '';

  loading: boolean = false;

  constructor(private snackBar: MatSnackBar, private auth: AuthService) {

  }

  showAlert(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  handleRegister() {
    // Validate if passwords match
    if (this.registerForm.password !== this.repeatPassword) {
      this.showAlert("Passwords don't match.", 'Close', 3000);
      return;
    }

    this.loading = true;
    this.auth.register(this.registerForm).subscribe({
      next: (response: any) => {
        this.showAlert(response.message, 'Close', 3000);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.showAlert(error.message, 'Close', 3000);
      },
    });
  }
}
