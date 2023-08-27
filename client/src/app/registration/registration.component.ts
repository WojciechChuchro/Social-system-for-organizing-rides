import {Component} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {AuthService} from '../../services/auth.service'
import {RegisterForm} from '../../types/user'
import {UtilityService} from '../../services/utility.service'

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
  repeatPassword: string = ''

  loading: boolean = false

  constructor(private snackBar: MatSnackBar, private auth: AuthService, private utilityService: UtilityService) {

  }

  handleRegister(): void {
    if (this.registerForm.password !== this.repeatPassword) {
      this.utilityService.showAlert('Passwords don\'t match.', 'Close', 3000);
      return
    }

    this.loading = true
    this.auth.register(this.registerForm).subscribe({
      next: (response) => {
        this.utilityService.showAlert(response.message, 'Close', 3000);
        this.loading = false
      },
      error: (error) => {
        this.loading = false
        this.utilityService.showAlert(error.message, 'Close', 3000);
      },
    })
  }
}
