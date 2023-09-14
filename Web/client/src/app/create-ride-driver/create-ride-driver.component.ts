import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create-ride-driver',
  templateUrl: './create-ride-driver.component.html',
  styleUrls: ['./create-ride-driver.component.scss'],
})
export class CreateRideDriverComponent implements OnInit {
  rideForm!: FormGroup;
  cities: string[] = []; // Initialize as an empty array
  showCityList = false;
  destinationCities: string[] = [];
  showDestinationCityList = false;
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
      start_city: ['', [Validators.required, this.cityValidator(this.cities)]],
      destination_city: [
        '',
        [Validators.required, this.cityValidator(this.destinationCities)],
      ],
    });

    this.rideForm
      .get('start_city')
      ?.valueChanges.pipe(
        switchMap((value) =>
          this.http.get<any>(`http://localhost:8080/api/get-cities/${value}`),
        ),
      )
      .subscribe((data) => {
        this.cities = data.filteredCities;
        this.showCityList = true;
        this.rideForm
          .get('start_city')
          ?.setValidators([
            Validators.required,
            this.cityValidator(this.cities),
          ]);
        this.rideForm
          .get('start_city')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.rideForm
      .get('destination_city')
      ?.valueChanges.pipe(
        switchMap((value) =>
          this.http.get<any>(`http://localhost:8080/api/get-cities/${value}`),
        ),
      )
      .subscribe((data) => {
        this.destinationCities = data.filteredCities;
        this.showDestinationCityList = true;
        this.rideForm
          .get('destination_city')
          ?.setValidators([
            Validators.required,
            this.cityValidator(this.destinationCities),
          ]);
        this.rideForm
          .get('destination_city')
          ?.updateValueAndValidity({ emitEvent: false });
      });
  }

  cityValidator(
    allowedCities: string[],
  ): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!allowedCities.includes(value)) {
        return { cityNotInList: true };
      }
      return null;
    };
  }

  onCitySelected(city: string) {
    this.rideForm.get('start_city')?.setValue(city, { emitEvent: false });
    this.cities = [];
    this.showCityList = false;
  }

  onDestinationCitySelected(city: string) {
    this.rideForm.get('destination_city')?.setValue(city, { emitEvent: false });
    this.destinationCities = [];
    this.showDestinationCityList = false;
  }
  handleCreateRide() {
    console.log(this.rideForm);
  }
}
