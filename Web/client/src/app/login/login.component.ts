import {Component, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginForm } from 'src/types/user';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  hidePassword: boolean = true;
  loading: boolean = false;

  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder
  ) {}
  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  handleLogin(): void {
    this.loading = true;
    const formData = this.loginForm.value as LoginForm;
    this.authService.login(formData).subscribe({
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
