import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs' // <-- Added Observable import here
import {Ride} from '../types/ride'
import {HttpClient} from '@angular/common/http'
import {Rides, RidesResponse} from '../types/response'
import {map} from 'rxjs/operators'
import {MessageResponseOnly} from '../types/user'

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private rideSource = new BehaviorSubject<Ride | undefined>(undefined)
  currentRide = this.rideSource.asObservable()

  constructor(private http: HttpClient) {
  } // <-- Corrected this line

  formatDate(dateTime: string): string {
    const datePart = dateTime.split(' ')[0] // Get the date part
    const date = new Date(datePart)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
    return date.toLocaleDateString('en-GB', options)
  }

  formatTime(dateTime: string): string {
    const timePart = dateTime.split(' ')[1] // Get the time part
    return timePart.slice(0, 5) // Remove seconds
  }

  calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const difference = end.getTime() - start.getTime()
    const totalMinutes = Math.round(difference / (1000 * 60))
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    let durationStr = ''
    if (hours > 0) {
      durationStr += `${hours} ${hours > 1 ? 'hours' : 'hour'}`
    }

    if (minutes > 0) {
      if (durationStr) {
        durationStr += ' '
      }
      durationStr += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`
    }

    return durationStr
  }

  changeRide(ride: Ride | undefined): void {
    this.rideSource.next(ride)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reserveRide(rideId: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/accept-ride', {rideId}, {withCredentials: true}) // Assuming your API only needs the rideId.
  }

  fetchRides(): Observable<Rides[]> {
    return this.http
      .get<RidesResponse>('http://localhost:8080/api/get-rides', {
        withCredentials: true,
      })
      .pipe(
        map((response: RidesResponse) => {
          return response.rides.map((ride: Rides) => {
            ride.earliestDepartureDate = this.formatDate(
              ride.earliestDepartureTime,
            )
            ride.latestDepartureDate = this.formatDate(ride.latestDepartureTime)
            ride.earliestDepartureTime = this.formatTime(
              ride.earliestDepartureTime,
            )
            ride.latestDepartureTime = this.formatTime(ride.latestDepartureTime)
            ride.duration = this.calculateDuration(
              ride.earliestDepartureDate + ' ' + ride.earliestDepartureTime,
              ride.latestDepartureDate + ' ' + ride.latestDepartureTime,
            )
            return ride
          })
        }),
      )
  }

  fetchRidesAsPassenger(): Observable<Rides[]> {
    return this.http
      .get<RidesResponse>('http://localhost:8080/api/get-rides-as-passenger', {
        withCredentials: true,
      })
      .pipe(
        map((response: RidesResponse) => {
          console.log(response)
          return response.rides.map((ride: Rides) => {
            ride.earliestDepartureDate = this.formatDate(
              ride.earliestDepartureTime
            )
            ride.latestDepartureDate = this.formatDate(ride.latestDepartureTime)
            ride.earliestDepartureTime = this.formatTime(
              ride.earliestDepartureTime
            )
            ride.latestDepartureTime = this.formatTime(ride.latestDepartureTime)
            ride.duration = this.calculateDuration(
              ride.earliestDepartureDate + ' ' + ride.earliestDepartureTime,
              ride.latestDepartureDate + ' ' + ride.latestDepartureTime
            )
            return ride
          })
        })
      )
  }

  deleteUser(statusId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>('http://localhost:8080/api/delete', {statusId}, {
      withCredentials: true,
    })
  }

  acceptUser(statusId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>('http://localhost:8080/api/accept', {statusId}, {
      withCredentials: true,
    })
  }


}
