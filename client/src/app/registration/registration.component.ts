import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  email: string = '';
  name: string = '';
  surname: string = '';
  phone_number: string = '';
  password: string = '';
  repeatPassword: string = '';

  handleRegister() {
    // Validate if passwords match
    if (this.password !== this.repeatPassword) {
      console.log("Passwords don't match.");
      return;
    }

    // Implement your registration logic here
    console.log('Registration data:', {
      email: this.email,
      name: this.name,
      surname: this.surname,
      phone_number: this.phone_number,
      password: this.password,
    });
  }
}
