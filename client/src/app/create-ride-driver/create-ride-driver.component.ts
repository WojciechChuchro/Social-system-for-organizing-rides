import { Component } from '@angular/core';

@Component({
  selector: 'app-create-ride-driver',
  templateUrl: './create-ride-driver.component.html',
  styleUrls: ['./create-ride-driver.component.scss'],
})
export class CreateRideDriverComponent {
  starting_point: string = '';
  destination: string = '';
  departure_time: string = '';
  arrival_time: string = '';
  price: number | null = null;
  car_model: string = '';
  registration_number: string = '';
  number_of_seats: number | null = null;

  handleCreateRide() {
    // Implement your create ride logic here
    console.log('Ride data:', {
      starting_point: this.starting_point,
      destination: this.destination,
      departure_time: this.departure_time,
      arrival_time: this.arrival_time,
      price: this.price,
      car_model: this.car_model,
      registration_number: this.registration_number,
      number_of_seats: this.number_of_seats,
    });
  }
}
