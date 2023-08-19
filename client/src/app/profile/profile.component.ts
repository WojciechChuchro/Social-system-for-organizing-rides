import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Component, OnInit} from '@angular/core'
import {CookieService} from 'ngx-cookie-service'
import {profileForm} from '../../types/user'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	email: string | null
	name: string | null
	surname: string | null
	phoneNumber: string | null
	profilePicture: string | null
	profileForm: profileForm = {
		email: '',
		name: '',
		surname: '',
		phoneNumber: '',
		password: '',
	}
	constructor(private http: HttpClient, private cookieService: CookieService, private snackBar: MatSnackBar) {
		this.email = null
		this.name =null
		this.surname = null
		this.phoneNumber = null
		this.profilePicture = null
	}

	ngOnInit(): void {
		// Call the method here if you want to send the request on component initialization.
		// Otherwise, you can call it from any other method or event in your component.
		this.getDataWithJwtCookie()
	}

	showAlert(message: string, action: string, duration: number) {

		this.snackBar.open(message, action, {
			duration: duration,
		})
	}
	updateProfile(): void {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.getJWT()}`
		})

		console.log(this.profileForm)
		this.http.patch('http://localhost:8080/api/users/update', this.profileForm, { headers }).subscribe(
			(response: any) => {
				this.showAlert(response.message, 'Close', 3000)
			},
			(error: any) => {
				console.log(error)
				this.showAlert(error.error.message, 'Close', 3000)
			}
		)
	}
	getJWT(): string {
		// Get the JWT cookie value from the browser's cookies.
		const jwtCookie = this.cookieService.get('JsonWebToken')
		if (!jwtCookie) {
			console.error('JWT cookie not found.')
			return 'jwt token not found'
		}

		// Set the JWT as an Authorization header in the request.

		return jwtCookie
	}
	getDataWithJwtCookie(): void {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.getJWT()}`
		})

		// Replace 'your-backend-url' with the actual URL of your backend API endpoint.
		this.http.get('http://localhost:8080/api/users', { headers }).subscribe(
			(response: any) => {
				this.email = response.email
				this.name = response.name
				this.surname = response.surname
				this.phoneNumber = response.phoneNumber
				this.profilePicture = response.profilePicture
			},
			(error: any) => {
				// Handle the error here.
				console.error('Error:', error)
			}
		)
	}
}
