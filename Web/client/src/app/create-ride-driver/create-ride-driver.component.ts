import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-ride-driver',
  templateUrl: './create-ride-driver.component.html',
  styleUrls: ['./create-ride-driver.component.scss'],
})
export class CreateRideDriverComponent implements OnInit {
  rideForm!: FormGroup;
  cities: string[] = []; // Initialize as an empty array
  showCityList = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.rideForm = this.fb.group({
      starting_point: [''],
      departure_time: [''],
      arrival_time: [''],
      price: [''],
      car_model: [''],
      registration_number: [''],
      number_of_seats: [''],
      start_city: ['', Validators.required],
    });

    this.rideForm
      .get('start_city')
      ?.valueChanges.pipe(
        switchMap((value) =>
          this.http.get<any>(`http://localhost:8080/api/get-cities/${value}`),
        ),
      )
      .subscribe((data) => {
        this.cities = data.filteredCities; // Assuming the server returns an object where the cities are in a 'cities' field
        this.showCityList = true;
      });
  }

  onCitySelected(city: string) {
    this.rideForm.get('start_city')?.setValue(city);
    this.cities = []; // Clear the dropdown list
    this.showCityList = false;
  }

  handleCreateRide() {
    // Your POST API logic here
  }
}
