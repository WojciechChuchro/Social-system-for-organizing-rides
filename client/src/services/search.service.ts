import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RidesResponse, UsersResponse } from '../types/response';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiBaseUrl: string;
  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  getAllRides(): Observable<RidesResponse> {
    return this.http.get<RidesResponse>(`${this.apiBaseUrl}/rides`);
  }

  getUsers(userIds: number[]): Observable<UsersResponse> {
    return this.http.post<UsersResponse>(`${this.apiBaseUrl}/users`, userIds);
  }
}
