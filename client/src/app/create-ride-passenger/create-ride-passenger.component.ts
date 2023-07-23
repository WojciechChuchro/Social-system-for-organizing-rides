import { Component } from '@angular/core';

@Component({
  selector: 'app-create-ride-passenger',
  templateUrl: './create-ride-passenger.component.html',
  styleUrls: ['./create-ride-passenger.component.scss'],
})
export class CreateRidePassengerComponent {
  starting_point: string = '';
  destination: string = '';
  earliest_departure_time: string = '';
  latest_departure_time: string = '';
  number_of_passengers: number | null = null;
  max_price: number | null = null;

  handleCreateRide() {
    // Implement your create ride logic here
    console.log('Ride data:', {
      starting_point: this.starting_point,
      destination: this.destination,
      earliest_departure_time: this.earliest_departure_time,
      latest_departure_time: this.latest_departure_time,
      number_of_passengers: this.number_of_passengers,
      max_price: this.max_price,
    });
  }
}
