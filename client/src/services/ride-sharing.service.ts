import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'  // <-- Added Observable import here
import { Ride } from '../types/ride'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RideSharingService {
  private rideSource = new BehaviorSubject<Ride | undefined>(undefined)
  currentRide = this.rideSource.asObservable()

  constructor(private http: HttpClient) {} // <-- Corrected this line

  changeRide(ride: Ride | undefined): void {
    this.rideSource.next(ride)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reserveRide(rideId: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/accept-ride', { rideId }, {withCredentials: true}) // Assuming your API only needs the rideId.
  }
}
