import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Ride} from '../../types/ride'
import {RidesResponse} from '../../types/response'

@Component({
  selector: 'app-your-rides',
  templateUrl: './your-rides.component.html',
  styleUrls: ['./your-rides.component.scss']
})
export class YourRidesComponent implements OnInit {
  rides: Ride[] = []

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchRides()
  }

  formatDate(dateTime: string): string {
    const datePart = dateTime.split(' ')[0] // Get the date part
    const date = new Date(datePart)
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
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


  fetchRides(): void {
    this.http.get<RidesResponse>('http://localhost:8080/api/get-rides', {withCredentials: true}).subscribe((response: RidesResponse) => {
      this.rides = response.rides.map((ride: Ride) => {
        // Format date and time
        ride.earliestDepartureDate = this.formatDate(ride.earliestDepartureTime)
        ride.latestDepartureDate = this.formatDate(ride.latestDepartureTime)
        ride.earliestDepartureTime = this.formatTime(ride.earliestDepartureTime)
        ride.latestDepartureTime = this.formatTime(ride.latestDepartureTime)

        // Calculate the duration and add it to the ride object
        ride.duration = this.calculateDuration(ride.earliestDepartureDate + ' ' + ride.earliestDepartureTime,
          ride.latestDepartureDate + ' ' + ride.latestDepartureTime)
        return ride
      })
    })
  }


}
