import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Rides, UserRides} from '../../types/response'
import {RideService, UserRides2} from '../../services/ride.service'
import {MessageResponseOnly} from '../../types/user'
import {MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-your-rides',
  templateUrl: './your-rides.component.html',
  styleUrls: ['./your-rides.component.scss'],
})
export class YourRidesComponent implements OnInit {
  rides: Rides[] = []
  ridesPassangers: UserRides2[] = []

  constructor(private http: HttpClient, private rideService: RideService, private snackBar: MatSnackBar,) {
  }

  showAlert(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration: duration,
    })
  }

  ngOnInit(): void {
    this.fetchAllRides()
    console.log('ridesPassanger',this.ridesPassangers)
  }

  fetchAllRides(): void {
    this.rideService.fetchRides().subscribe((rides: Rides[]) => {
      this.rides = rides
    })

    this.rideService.fetchRidesAsPassenger().subscribe((rides: UserRides2[]) => {
      this.ridesPassangers = rides
    })
  }

  deleteUser(statusId: number): void {
    this.rideService.deleteUser(statusId).subscribe((response: MessageResponseOnly) => {
      this.showAlert(response.message, 'Close', 3000)
      this.fetchAllRides()
    })
  }

  acceptUser(statusId: number): void {
    this.rideService.acceptUser(statusId).subscribe((response: MessageResponseOnly) => {
      this.showAlert(response.message, 'Close', 3000)
      this.fetchAllRides()
    })
  }
}

