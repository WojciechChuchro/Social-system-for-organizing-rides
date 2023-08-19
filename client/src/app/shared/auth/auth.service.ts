import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {LoginForm, MessageResponseOnly, RegisterForm} from 'src/types/user'
import {Observable} from 'rxjs'
import {JsonWebTokenInterface} from '../../login/login.component'

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {
	}


	login(user: LoginForm): Observable<JsonWebTokenInterface> {
		return this.http.post<JsonWebTokenInterface>('http://localhost:8080/api/auth/login', user)
	}

	register(user: RegisterForm): Observable<MessageResponseOnly> {
		return this.http.post<MessageResponseOnly>('http://localhost:8080/api/auth/register', user)
	}
}
