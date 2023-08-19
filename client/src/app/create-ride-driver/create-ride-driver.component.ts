import {Component} from '@angular/core'

@Component({
	selector: 'app-create-ride-driver',
	templateUrl: './create-ride-driver.component.html',
	styleUrls: ['./create-ride-driver.component.scss'],
})
export class CreateRideDriverComponent {
	starting_point!: Date
	departure_time: string = ''
	arrival_time: string = ''
	price: number | null = null
	car_model: string = ''
	registration_number: string = ''
	number_of_seats: number | null = null

	onStartingPointSelected(event: any): void {
		this.starting_point = event.value
	}

	// Function to handle destination date selection
	handleCreateRide() {
		console.log('Ride data:', {
			starting_point: this.starting_point,
			departure_time: this.departure_time,
			arrival_time: this.arrival_time,
			price: this.price,
			car_model: this.car_model,
			registration_number: this.registration_number,
			number_of_seats: this.number_of_seats,
		})
	}
}
