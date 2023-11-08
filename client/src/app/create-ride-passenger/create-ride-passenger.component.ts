import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs';
import { cityValidator } from '../../validators/search';
import * as moment from 'moment';
import { UtilityService } from '../../services/utility.service';
import { MessageResponseOnly } from '../../types/user';
import {environment} from "../../environments/environment.development";

@Component({
  selector: 'app-create-ride-passenger',
  templateUrl: './create-ride-passenger.component.html',
  styleUrls: ['./create-ride-passenger.component.scss'],
})
export class CreateRidePassengerComponent implements OnInit {
  rideForm!: FormGroup;
  cities: string[] = [];
  showCityList = false;
  destinationCities: string[] = [];
  showDestinationCityList = false;
  private apiBaseUrl: string;

  constructor(
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  ngOnInit() {
    this.rideForm = this.formBuilder.group({
      startCityName: ['', [Validators.required, cityValidator(this.cities)]],
      destinationCityName: [
        '',
        [Validators.required, cityValidator(this.destinationCities)],
      ],
      startStreetName: ['', Validators.required],
      startZipCode: ['', Validators.required],
      startHouseNumber: ['', Validators.required],
      // setting the earliest departure day to today
      earliestDepartureDate: [new Date(), Validators.required],
      // setting latest departure day to tomorrow
      latestDepartureDate: [new Date(new Date().setDate(new Date().getDate() + 1)), Validators.required],
      maxPrice: [0, [Validators.required, Validators.min(1)]],
      seatsNumber: [1, [Validators.required, Validators.min(1)]],
    });

    this.rideForm
      .get('startCityName')
      ?.valueChanges.pipe(
      tap((value) => {
        if (value.trim().length === 0) {
          this.cities = [];
          this.showCityList = false;
        }
      }),
      filter((value) => value.trim().length > 0),
      switchMap((value) =>
        // todo: Fix types
        this.http.get<any>(`${this.apiBaseUrl}/get-cities/${value}`),
      ),
    )
      .subscribe((data) => {
        this.cities = data.filteredCities;
        this.showCityList = true;
        this.rideForm
          .get('startCityName')
          ?.setValidators([Validators.required, cityValidator(this.cities)]);
        this.rideForm
          .get('startCityName')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.rideForm
      .get('destinationCityName')
      ?.valueChanges.pipe(
      tap((value) => {
        if (value.trim().length === 0) {
          this.destinationCities = [];
          this.showDestinationCityList = false;
        }
      }),
      filter((value) => value.trim().length > 0),
      switchMap((value) =>
        this.http.get<any>(`${this.apiBaseUrl}/get-cities/${value}`),
      ),
    )
      .subscribe((data) => {
        this.destinationCities = data.filteredCities;
        this.showDestinationCityList = true;
        this.rideForm
          .get('destinationCityName')
          ?.setValidators([
            Validators.required,
            cityValidator(this.destinationCities),
          ]);
        this.rideForm
          .get('destinationCityName')
          ?.updateValueAndValidity({ emitEvent: false });
      });
  }

  onCitySelected(city: string) {
    this.rideForm.get('startCityName')?.setValue(city, { emitEvent: false });
    this.cities = [];
    this.showCityList = false;
  }

  onDestinationCitySelected(city: string) {
    this.rideForm
      .get('destinationCityName')
      ?.setValue(city, { emitEvent: false });
    this.destinationCities = [];
    this.showDestinationCityList = false;
  }
  handleCreateRide() {
    const formData = this.rideForm.value

    this.http
      .post<MessageResponseOnly>(
        `${this.apiBaseUrl}/create-ride-passenger`,
        formData,
        {
          withCredentials: true,
        },
      )
      .subscribe(
        (response) => {
          this.utilityService.showAlert(response.message, 'Close', 3000);
        },
        (error) => {
          const errorMessage =
            error.error.message || 'An unknown error occurred';
          this.utilityService.showAlert(errorMessage, 'Close', 3000);
        },
      );
  }
}
