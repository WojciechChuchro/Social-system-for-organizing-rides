import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {LoginForm, RegisterForm} from 'src/types/user'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

	login(user: LoginForm) {
		return this.http.post('http://localhost:8080/api/auth/login', user)
	}

	register(user: RegisterForm) {
		return this.http.post('http://localhost:8080/api/auth/register', user)
	}
}
