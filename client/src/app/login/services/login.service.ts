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
