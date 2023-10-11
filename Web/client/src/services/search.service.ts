import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RidesResponse, UsersResponse } from '../types/response';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly apiBaseUrl: string;
  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  getAllRides(startCity: string, destinationCity: string, selectedDate: string): Observable<RidesResponse> {
    const url = `${this.apiBaseUrl}/rides/${startCity}/${destinationCity}/${selectedDate}`;
    return this.http.get<RidesResponse>(url);
  }

  getAllRides2(): Observable<RidesResponse> {
    return this.http.get<RidesResponse>(`${this.apiBaseUrl}/rides`);
  }
}
