import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Call the method here if you want to send the request on component initialization.
    // Otherwise, you can call it from any other method or event in your component.
    this.getDataWithJwtCookie();
  }


  getDataWithJwtCookie(): void {
    // Get the JWT cookie value from the browser's cookies.
    const jwtCookie = this.cookieService.get('JsonWebToken');
    if (!jwtCookie) {
      console.error('JWT cookie not found.');
      return;
    }

    // Set the JWT as an Authorization header in the request.
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtCookie}`
    });

    // Replace 'your-backend-url' with the actual URL of your backend API endpoint.
    this.http.get('http://localhost:8080/api/users', { headers }).subscribe(
        (response: any) => {
          // Handle the successful response here.
          console.log('Response:', response);
        },
        (error: any) => {
          // Handle the error here.
          console.error('Error:', error);
        }
    );
  }
}
