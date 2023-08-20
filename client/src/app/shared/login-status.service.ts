import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  private loginStatusSubject = new BehaviorSubject<boolean>(false)
  loginStatus$ = this.loginStatusSubject.asObservable()

  setLoginStatus(isLoggedIn: boolean): void {
    this.loginStatusSubject.next(isLoggedIn)
  }
}
