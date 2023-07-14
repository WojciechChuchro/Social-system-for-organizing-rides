import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

interface LoginResponse {
  message: string;
  id_user: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: string;
  password!: string;
  loginResponse: LoginResponse | undefined = undefined;

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  handleLogin() {
    console.log(this.loginService.login(this.login, this.password));
  }
}
