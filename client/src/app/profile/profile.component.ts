import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Component, OnInit} from '@angular/core'
import {CookieService} from 'ngx-cookie-service'
import {MessageResponseOnly, profileForm, Reviews, UserWithReviews} from '../../types/user'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string | null = null
  name: string | null = null
  surname: string | null = null
  phoneNumber: string | null = null
  profilePicture: string | null = null
  reviews: Reviews[] | null = null
  averageRating: number | null = null

  profileForm: profileForm = {
    email: '',
    name: '',
    surname: '',
    phoneNumber: '',
    password: '',
  }

  constructor(private http: HttpClient, private cookieService: CookieService, private snackBar: MatSnackBar) {

  }

  computeAverageRating(): void {
    if (this.reviews && this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0)
      this.averageRating = totalRating / this.reviews.length
    } else {
      this.averageRating = null
    }
  }

  ngOnInit(): void {
    // Call the method here if you want to send the request on component initialization.
    // Otherwise, you can call it from any other method or event in your component.
    this.getDataWithJwtCookie()
  }

  showAlert(message: string, action: string, duration: number): void {

    this.snackBar.open(message, action, {
      duration: duration,
    })
  }

  updateProfile(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getJWT()}`
    })

    this.http.patch<MessageResponseOnly>('http://localhost:8080/api/users/update', this.profileForm, {headers}).subscribe(
      (response: MessageResponseOnly) => {
        this.showAlert(response.message, 'Close', 3000)
      },
      (error) => {
        console.log(error)
        this.showAlert(error.error.message, 'Close', 3000)
      }
    )
  }

  getJWT(): string | null {
    const jwtCookie = this.cookieService.get('JsonWebToken')
    console.log(jwtCookie)
    if (!jwtCookie) {
      console.warn('JWT cookie not found.')
      return null
    }

    return jwtCookie
  }

  getDataWithJwtCookie(): void {
    this.http.get<UserWithReviews>('http://localhost:8080/api/user', {withCredentials: true}).subscribe(
      (response: UserWithReviews) => {
        console.log(response)
        this.reviews = response.reviews
        this.email = response.email
        this.name = response.name
        this.surname = response.surname
        this.phoneNumber = response.phoneNumber
        this.profilePicture = response.profilePicture
        this.computeAverageRating()
      },
      (error) => {
        console.error('Error:', error)
      }
    )
  }


}
