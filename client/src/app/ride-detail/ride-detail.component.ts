import {Component, OnInit} from '@angular/core'
import {Ride} from '../search/search.component'
import {RideSharingService} from '../../services/ride-sharing.service'

@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.scss']
})
export class RideDetailComponent implements OnInit {
  ride: Ride | undefined

  constructor(private rideSharingService: RideSharingService) {
  }

  ngOnInit(): void {
    this.rideSharingService.currentRide.subscribe(ride => this.ride = ride)
  }
}
