import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Rides,
  RidesResponse,
  UserRides,
  UserRidesResponse,
} from '../../types/response';
import { RideService } from '../../services/ride.service';
import { MessageResponseOnly } from '../../types/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-rides',
  templateUrl: './your-rides.component.html',
  styleUrls: ['./your-rides.component.scss'],
})
export class YourRidesComponent implements OnInit {
  rides: Rides[] = [];
  ridesPassangers: UserRides[] = [];

  constructor(
    private http: HttpClient,
    private rideService: RideService,
    private snackBar: MatSnackBar,
    private utilityService: UtilityService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllRides();
  }

  getAllRides(): void {
    this.rideService.getRidesForDriver().subscribe({
      next: (ridesResponse: RidesResponse) => {
        this.rides = ridesResponse.rides;
        console.log('rides', ridesResponse.rides);
      },
      error: (error) => {
        const errorMessage = error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });

    this.rideService.getRidesForPassenger().subscribe({
      next: (userRidesResponse: UserRidesResponse) => {
        this.ridesPassangers = userRidesResponse.userRides;
        console.log(userRidesResponse.userRides);
      },
      error: (error) => {
        const errorMessage = error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }

  deleteUser(statusId: number): void {
    this.rideService.deleteUser(statusId).subscribe({
      next: (response: MessageResponseOnly) => {
        this.utilityService.showAlert(response.message, 'Close', 3000);
        this.getAllRides();
      },
      error: (error) => {
        const errorMessage = error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }

  acceptUser(statusId: number): void {
    this.rideService.acceptUser(statusId).subscribe({
      next: (response: MessageResponseOnly) => {
        this.utilityService.showAlert(response.message, 'Close', 3000);
        this.getAllRides();
      },
      error: (error) => {
        const errorMessage = error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });
  }

  navigateToDetailsPage() {
    this.router.navigate(['/details-page']);
  }
}
