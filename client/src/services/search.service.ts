import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {RidesResponse, UsersResponse} from '../types/response'

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  getAllRides(): Observable<RidesResponse> {
    return this.http.get<RidesResponse>('http://localhost:8080/api/rides')
  }


  getUsers(userIds: number[]): Observable<UsersResponse> {
    return this.http.post<UsersResponse>('http://localhost:8080/api/users', userIds)
  }

}
