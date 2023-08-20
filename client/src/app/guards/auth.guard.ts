import {Injectable} from '@angular/core'
import {CanActivate, Router} from '@angular/router'
import {catchError, Observable, of, tap} from 'rxjs'
import {AuthenticationService} from '../../services/authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.validateToken().pipe(
      tap(isValid => {
        if (!isValid) {
          console.log('ieoauaoeuaoeuao')
          this.router.navigate(['/login'])
        }
      }),
      catchError(error => {
        console.error('Error validating token', error)
        this.router.navigate(['/login'])
        return of(false) // This ensures your Observable correctly completes
      })
    )

  }
}
