import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    login: string,
    name: string,
    surename: string,
    phone_number: string,
    profile_picture: string,
    password: string
  ) {
    const requestBody = {
      login: login,
      name: name,
      surename: surename,
      phone_number: phone_number,
      profile_picture: profile_picture,
      password: password,
    };

    return this.http.post('/register', requestBody).subscribe(
      (response) => {
        console.log('Registration successful:', response);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
