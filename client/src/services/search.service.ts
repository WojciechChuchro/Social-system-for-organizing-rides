import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  getAllRides() {
    return this.http.get('http://localhost:8080/api/rides');
  }

  getUsers(userIds: number[]) {
    return this.http.post('http://localhost:8080/api/users', userIds);

  }
}
