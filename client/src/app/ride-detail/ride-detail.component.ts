import {Component, OnInit} from '@angular/core'
import {RideService} from '../../services/ride.service'
import {Ride} from '../../types/ride'

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.scss']
})
export class RideDetailComponent implements OnInit {
  ride: Ride | undefined

  constructor(private rideSharingService: RideService) {
  }

  ngOnInit(): void {
    this.rideSharingService.currentRide.subscribe(ride => this.ride = ride)
  }
  reserveRide(): void {
    if (this.ride) {
      this.rideSharingService.reserveRide(this.ride.id)
        .subscribe(response => {
          // Handle the response as required.
          console.log(response)
          alert('Ride reserved successfully!')
        }, error => {
          // Handle any errors here.
          console.error('Error reserving the ride:', error)
          alert('Error reserving the ride.')
        })
    }
  }
}
