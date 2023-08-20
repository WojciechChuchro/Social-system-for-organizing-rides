import {Component} from '@angular/core'
import {AuthService} from '../shared/auth/auth.service'
import {LoginForm} from 'src/types/user'
import {CookieService} from 'ngx-cookie-service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {LoginStatusService} from '../shared/login-status.service'


export interface JsonWebTokenInterface {
  token: string
}

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
    private auth: AuthService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private loginStatusService: LoginStatusService
  ) {
  }

  showAlert(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration: duration,
    })
  }


  handleLogin(): void {
    this.loading = true
    this.auth.login(this.loginForm).subscribe({
      next: (response) => {
        // if (response.token) {
        // 	this.cookieService.set('JsonWebToken', response.token)
        // }
        // If the response doesn't include the message anymore, you can remove this line or adjust accordingly
        this.showAlert(response.message, 'Close', 3000)
        this.loginStatusService.setLoginStatus(true)
        this.loading = false
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
