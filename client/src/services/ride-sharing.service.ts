import {Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {Ride} from '../types/ride'

@Injectable({
  providedIn: 'root'
})
export class RideSharingService {
  private rideSource = new BehaviorSubject<Ride | undefined>(undefined)
  currentRide = this.rideSource.asObservable()

  constructor() {
  }

  changeRide(ride: Ride | undefined): void {
    this.rideSource.next(ride)
  }
}
