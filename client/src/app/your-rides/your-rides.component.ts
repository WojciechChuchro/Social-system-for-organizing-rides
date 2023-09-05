import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Rides, UserRides} from '../../types/response'
import {RideService} from '../../services/ride.service'
import {MessageResponseOnly} from '../../types/user'
import {MatSnackBar} from '@angular/material/snack-bar'
import {UtilityService} from '../../services/utility.service'

@Component({
  selector: 'app-your-rides',
  templateUrl: './your-rides.component.html',
  styleUrls: ['./your-rides.component.scss'],
})
export class YourRidesComponent implements OnInit {
  rides: Rides[] = []
  ridesPassangers: UserRides[] = []

  constructor(private http: HttpClient, private rideService: RideService, private snackBar: MatSnackBar, private utilityService: UtilityService) {
  }

  // showAlert(message: string, action: string, duration: number): void {
  //   this.snackBar.open(message, action, {
  //     duration: duration,
  //   })
  // }

  ngOnInit(): void {
    this.fetchAllRides()
  }

  fetchAllRides(): void {
    this.rideService.fetchRides().subscribe({
      next: (rides: Rides[]) => {
        this.rides = rides
      },
      error: error => {
        const errorMessage = error.error.message || 'An unknown error occurred'
        this.utilityService.showAlert(errorMessage, 'Close', 3000)
      },
    })

    this.rideService.fetchRidesAsPassenger().subscribe({
      next: (rides: UserRides[]) => {
        this.ridesPassangers = rides
      },
      error: error => {
        const errorMessage = error.error.message || 'An unknown error occurred'
        this.utilityService.showAlert(errorMessage, 'Close', 3000)
      },
    })
  }
  deleteUser(statusId: number): void {
    this.rideService.deleteUser(statusId).subscribe({
      next: (response: MessageResponseOnly) => {
        this.utilityService.showAlert(response.message, 'Close', 3000)
        this.fetchAllRides()
      },
      error: error => {
        const errorMessage = error.error.message || 'An unknown error occurred'
        this.utilityService.showAlert(errorMessage, 'Close', 3000)
      }
    })
  }
  acceptUser(statusId: number): void {
    this.rideService.acceptUser(statusId).subscribe({
      next: (response: MessageResponseOnly) => {
        this.utilityService.showAlert(response.message, 'Close', 3000)
        this.fetchAllRides()
      },
      error: error => {
        const errorMessage = error.error.message || 'An unknown error occurred'
        this.utilityService.showAlert(errorMessage, 'Close', 3000)
      }
    })
  }
}

