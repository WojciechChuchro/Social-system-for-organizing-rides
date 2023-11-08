import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, take } from 'rxjs';
// import {Ride, UserRides} from '../types/ride'
import { HttpClient } from '@angular/common/http';
import {
  LookingForDriverResponse,
  Rides, RidesPassangers,
  RidesResponse,
  UserRidesResponse,
} from '../types/response';
import { MessageResponseOnly, MessagesResponse } from '../types/user';
import { environment } from '../environments/environment.development';
import { switchMap } from 'rxjs/operators';

export interface IdSource {
  driverId: number;
  passengerId: number;
}
@Injectable({
  providedIn: 'root',
})
export class RideService {
  private readonly apiBaseUrl: string;
  private rideSource = new BehaviorSubject<Rides | undefined>(undefined);
  currentRide = this.rideSource.asObservable();
  private idSource = new BehaviorSubject<IdSource | undefined>(undefined);
  currentIds = this.idSource.asObservable();
  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  formatDate(dateTime: string): string {
    const datePart = dateTime.split(' ')[0];
    const date = new Date(datePart);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  }

  // formatTime(dateTime: string): string {
  //   const timePart = dateTime.split(' ')[1] // Get the time part
  //   return timePart.slice(0, 5) // Remove seconds
  // }

  calculateDuration(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const difference = end.getTime() - start.getTime();
    const totalMinutes = Math.round(difference / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let durationStr = '';
    if (hours > 0) {
      durationStr += `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
    }

    if (minutes > 0) {
      if (durationStr) {
        durationStr += ' ';
      }
      durationStr += `${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
    }

    return durationStr;
  }

  changeRide(ride: Rides | undefined): void {
    this.rideSource.next(ride);
  }

  changeId(driverId: number, passengerId: number): void {
    this.idSource.next({ driverId, passengerId });
  }

  reserveRide(rideId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(
      `${this.apiBaseUrl}/accept-ride`,
      { rideId },
      { withCredentials: true },
    );
  }

  getMessages(): Observable<MessagesResponse> {
    return this.currentIds.pipe(
      take(1),
      switchMap((ids) => {
        if (ids && ids.driverId && ids.passengerId) {
          // Construct the URL with the driverId and passengerId
          return this.http.get<MessagesResponse>(
            `${this.apiBaseUrl}/messages/${ids.driverId}/${ids.passengerId}`,
            { withCredentials: true },
          );
        } else {
          return EMPTY;
        }
      }),
    );
  }

  getRidesForDriver(): Observable<RidesResponse> {
    return this.http.get<RidesResponse>(`${this.apiBaseUrl}/get-rides`, {
      withCredentials: true,
    });
  }

  getRidesForPassenger(): Observable<RidesPassangers> {
    return this.http.get<RidesPassangers>(
      `${this.apiBaseUrl}/get-rides-as-passenger`,
      {
        withCredentials: true,
      },
    );
  }

  deleteUser(statusId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(
      `${this.apiBaseUrl}/delete`,
      { statusId },
      {
        withCredentials: true,
      },
    );
  }

  acceptUser(statusId: number): Observable<MessageResponseOnly> {
    return this.http.post<MessageResponseOnly>(
      `${this.apiBaseUrl}/accept`,
      { statusId },
      {
        withCredentials: true,
      },
    );
  }

  getLookingForDrivers(
    pricePerPerson: number,
    numberOfSeats: number,
    startCityName: string,
    destinationCityName: string,
    departureTime: string,
  ) {
    // todo: Fix types
    return this.http.post<LookingForDriverResponse>(
      `${this.apiBaseUrl}/looking-for-drivers`,
      {
        pricePerPerson,
        numberOfSeats,
        startCityName,
        destinationCityName,
        departureTime,
      },
      {
        withCredentials: true,
      },
    );
  }
}
