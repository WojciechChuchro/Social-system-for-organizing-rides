import { Component, OnInit } from '@angular/core';
import { RideService } from '../../services/ride.service';
import { UtilityService } from '../../services/utility.service';
import { Rides } from '../../types/response';

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.scss'],
})
export class RideDetailComponent implements OnInit {
  ride: Rides | undefined;

  constructor(
    private rideSharingService: RideService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit(): void {
    this.rideSharingService.currentRide.subscribe((ride) => (this.ride = ride));
  }

  reserveRide(): void {
    if (this.ride) {
      this.rideSharingService.reserveRide(this.ride.id).subscribe({
        next: (response) => {
          this.utilityService.showAlert(response.message, 'Close', 3000);
        },
        error: (error) => {
          this.utilityService.showAlert(error.message, 'Close', 3000);
        },
      });
    }
  }
}
