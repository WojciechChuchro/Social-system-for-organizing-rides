import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {MessageResponseOnly} from '../../../types/user'

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private http: HttpClient) {
	}

	login(login: string, password: string) {
		const requestBody = {
			login: login,
			password: password,
		}

		return this.http.post<MessageResponseOnly>('http://localhost:8000/api/login', requestBody)
			.subscribe({
				next: (response: MessageResponseOnly) => {
					// If you want to perform some operations with the response, you can do so here.
					// For now, we'll simply return it.
					return response.message
				},
				error: (error) => {
					throw error
				},
			})
	}
}
