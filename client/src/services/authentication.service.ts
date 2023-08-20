import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {TokenValidationResponse} from '../types/response'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private validateEndpoint = 'http://localhost:8080/api/auth/validate-jwt'  // adjust this URL as needed

  constructor(private http: HttpClient) {
  }

  validateToken(): Observable<boolean> {
    return this.http.get<TokenValidationResponse>(this.validateEndpoint, {withCredentials: true}).pipe(
      map(response => {
        return response.isValid
      })
    )
  }
}
