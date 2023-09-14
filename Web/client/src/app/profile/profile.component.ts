import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  MessageResponseOnly,
  profileForm,
  Reviews,
  UserWithReviews,
} from '../../types/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UtilityService } from '../../services/utility.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  email: string | null = null;
  name: string | null = null;
  surname: string | null = null;
  phoneNumber: string | null = null;
  profilePicture: string | null = null;
  reviews: Reviews[] | null = null;
  averageRating: number | null = null;

  profileForm: profileForm = {
    email: '',
    name: '',
    surname: '',
    phoneNumber: '',
    password: '',
  };
  private apiBaseUrl: string;

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  computeAverageRating(): void {
    if (this.reviews && this.reviews.length > 0) {
      const totalRating = this.reviews.reduce(
        (acc, review) => acc + parseFloat(review.rating),
        0,
      );
      this.averageRating = totalRating / this.reviews.length;
    } else {
      this.averageRating = null;
    }
  }

  ngOnInit(): void {
    this.authService.getDataWithJwtCookie().subscribe({
      next: (response: UserWithReviews) => {
        console.log(response);
        this.reviews = response.reviews;
        this.email = response.email;
        this.name = response.name;
        this.surname = response.surname;
        this.phoneNumber = response.phoneNumber;
        this.profilePicture = response.profilePicture;
        this.computeAverageRating();
      },
      error: (error) => {
        console.error('Error:', error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }

  updateProfile(): void {
    this.http
      .patch<MessageResponseOnly>(
        `${this.apiBaseUrl}/users/update`,
        this.profileForm,
        { withCredentials: true },
      )
      .subscribe({
        next: (response: MessageResponseOnly) => {
          this.utilityService.showAlert(response.message, 'Close', 3000); // Use the service method
        },
        error: (error) => {
          console.log(error);
          const errorMessage =
            error.error.message || 'An unknown error occurred';
          this.utilityService.showAlert(errorMessage, 'Close', 3000); // Use the service method
        },
      });
  }
}
