import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../material/material.module';

interface LoginResponse {
  message: string;
  id_user: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MaterialModule],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  // login!: string;
  // password!: string;
  // loginResponse: LoginResponse | undefined = undefined;

  // constructor(private loginService: LoginService) {}

  // ngOnInit() {}

  // handleLogin() {
  //   this.loginService.login(this.login, this.password);
  // }
}
