import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {LoginForm, MessageResponseOnly, RegisterForm} from 'src/types/user'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }


  login(user: LoginForm): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>('http://localhost:8080/api/auth/login', user, {withCredentials: true})
  }

  register(user: RegisterForm): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>('http://localhost:8080/api/auth/register', user)
  }

  logout(): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>('http://localhost:8080/api/auth/logout', {}, {withCredentials: true})
  }
}
