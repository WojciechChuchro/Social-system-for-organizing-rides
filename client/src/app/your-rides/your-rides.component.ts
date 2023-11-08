import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Rides, RidesPassangers,
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
  ridesPassangers: RidesPassangers[] = [];

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
      },
      error: (error) => {
        console.log(error);
        const errorMessage = error.error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });

    this.rideService.getRidesForPassenger().subscribe({
    // @ts-ignore
      next: (userRidesResponse: RidesPassangers[]) => {
        this.ridesPassangers = userRidesResponse;
        console.log(this.ridesPassangers)
      },
      error: (error) => {
        const errorMessage = error.message || 'An unknown error occurred';
        this.utilityService.showAlert(errorMessage, 'Close', 3000);
      },
    });

    this.rides.map((ride) => {
      const { pricePerPerson, seatsNumber } = ride;
      this.rideService
        .getLookingForDrivers(
          pricePerPerson,
          seatsNumber,
          ride.startAddress.street.city.cityName,
          ride.destinationAddress.street.city.cityName,
          ride.earliestDepartureTime,
        )
        .subscribe({
          next: (response) => {
            console.log(response);
            ride.lookingForDrivers = response.lookingForDrivers;
            this.utilityService.showAlert(response.message, 'Close', 3000);
          },
          error: (error) => {
            const errorMessage = error.message || 'An unknown error occurred';
            this.utilityService.showAlert(errorMessage, 'Close', 3000);
          },
        });
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

  handleOpenChat(driverId: number, passangerId: number) {
    this.rideService.changeId(driverId, passangerId);
    this.router.navigate(['/messages']);
  }

  help(ride: any) {
    return ride.userRides.some(
      (userRide: any) => userRide.status.isAccepted === 1,
    );
  }
}
