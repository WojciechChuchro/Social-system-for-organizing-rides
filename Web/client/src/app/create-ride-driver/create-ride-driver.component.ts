import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs';
import { cityValidator } from '../validators';
import * as moment from 'moment';
import { UtilityService } from '../../services/utility.service';
import { MessageResponseOnly } from '../../types/user';

@Component({
  selector: 'app-create-ride-driver',
  templateUrl: './create-ride-driver.component.html',
  styleUrls: ['./create-ride-driver.component.scss'],
})
export class CreateRideDriverComponent implements OnInit {
  rideForm!: FormGroup;
  cities: string[] = [];
  showCityList = false;
  destinationCities: string[] = [];
  showDestinationCityList = false;

  constructor(
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.rideForm = this.formBuilder.group({
      startStreetName: ['', Validators.required],
      startZipCode: ['', Validators.required],
      startHouseNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      startCityName: ['', [Validators.required, cityValidator(this.cities)]],
      destinationCityName: [
        '',
        [Validators.required, cityValidator(this.destinationCities)],
      ],
      pricePerPerson: ['', [Validators.required, Validators.min(1)]],
      seatsNumber: ['', [Validators.required, Validators.min(1)]],
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
          this.http.get<any>(`http://localhost:8080/api/get-cities/${value}`),
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
          this.http.get<any>(`http://localhost:8080/api/get-cities/${value}`),
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

  combineValuesAndCalculateDates(formValue: any): {
    earliestDepartureTime: string;
    latestDepartureTime: string;
    startStreetName: any;
    startHouseNumber: any;
    startCityName: any;
    destinationCityName: any;
    startZipCode: any;
    pricePerPerson: any;
    seatsNumber: any;
  } {
    const {
      destinationCityName,
      duration,
      startHouseNumber,
      startDate,
      startTime,
      startCityName,
      startStreetName,
      startZipCode,
      pricePerPerson,
      seatsNumber,
    } = formValue;

    const startMoment = moment(startDate).set({
      hour: parseInt(startTime.split(':')[0], 10),
      minute: parseInt(startTime.split(':')[1], 10),
      second: 0,
    });

    const formattedStartTime = startMoment.format('YYYY-MM-DD HH:mm:ss');

    const durationMinutes =
      parseInt(duration.split(':')[0], 10) * 60 +
      parseInt(duration.split(':')[1], 10);

    const latestDepartureMoment = moment(startMoment).add(
      durationMinutes,
      'minutes',
    );

    const formattedLatestDepartureTime = latestDepartureMoment.format(
      'YYYY-MM-DD HH:mm:ss',
    );

    return {
      destinationCityName,
      startHouseNumber,
      startCityName,
      startStreetName,
      startZipCode,
      earliestDepartureTime: formattedStartTime,
      latestDepartureTime: formattedLatestDepartureTime,
      pricePerPerson,
      seatsNumber,
    };
  }

  handleCreateRide() {
    const combinedValues = this.combineValuesAndCalculateDates(
      this.rideForm.value,
    );

    this.http
      .post<MessageResponseOnly>(
        'http://localhost:8080/api/create-ride',
        combinedValues,
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
