import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private http: HttpClient) {}

	login(login: string, password: string) {
		const requestBody = {
			login: login,
			password: password,
		}

		return this.http
			.post('http://localhost:8000/api/login', requestBody)
			.subscribe({
				next: async (response: any) => {
					return response
				},
				error: (error: any) => {
					throw error
				},
			})
	}
}
