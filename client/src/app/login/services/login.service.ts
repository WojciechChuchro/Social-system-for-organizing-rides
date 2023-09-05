import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {MessageResponseOnly} from '../../../types/user'
import {Subscription} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Subscription {
    const requestBody = {
      login: login,
      password: password,
    }

    return this.http.post<MessageResponseOnly>('http://localhost:8000/api/login', requestBody)
      .subscribe({
        next: (response: MessageResponseOnly) => {
          return response.message
        },
        error: (error) => {
          throw error
        },
      })
  }

}
