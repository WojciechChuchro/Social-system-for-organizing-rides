import {Component} from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {LoginForm} from 'src/types/user'
import {MatSnackBar} from '@angular/material/snack-bar'
import {Router} from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: LoginForm = {
    email: '', // Initialize with empty string
    password: '', // Initialize with empty string
  }
  hidePassword: boolean = true
  loading: boolean = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,

  ) {
  }

  showAlert(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration: duration,
    })
  }


  handleLogin(): void {
    this.loading = true
    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        this.showAlert(response.message, 'Close', 3000)
        this.authService.setLoginStatus(true)
        this.loading = false
        this.router.navigate(['/about-us'])
      },
      error: (error) => {
        this.loading = false
        this.showAlert(error.message, 'Close', 3000)
      },
    })
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword
  }
}
