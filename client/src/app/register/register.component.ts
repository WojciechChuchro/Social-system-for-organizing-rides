import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  login!: string;
  name!: string;
  surename!: string;
  phone_number!: string;
  profile_picture = 'base profile picutre';
  password!: string;
  // repeatPassword!: string;

  constructor(private http: HttpClient) {}

  handleRegister() {
    const requestBody = {
      login: this.login,
      name: this.name,
      surename: this.surename,
      phone_number: this.phone_number,
      profile_picture: this.profile_picture,
      password: this.password,
    };

    return this.http.post('/register', requestBody).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (error) => {
        console.error('Registration error:', error);
      },
    });
  }
}
