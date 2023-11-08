import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { RideService } from '../../services/ride.service';
import { Rides, RidesResponse } from '../../types/response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  cityValidator,
  passengerCountValidator,
} from '../../validators/search';
import { tap } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchedRides: Rides[] = [];
  searchForm!: FormGroup;
  rides: Rides[] = [];
  loading: boolean = false;
  startCities: string[] = [];
  destinationCities: string[] = [];
  showStartCityList!: boolean;
  showDestinationCityList!: boolean;

  constructor(
    private router: Router,
    private search: SearchService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private rideSharingService: RideService,
  ) {}

  ngOnInit(): void {
    this.getRides();

    this.searchForm = this.formBuilder.group({
      startCity: ['', [Validators.required, cityValidator(this.startCities)]],
      destinationCity: [
        '',
        [Validators.required, cityValidator(this.destinationCities)],
      ],
      selectedDate: [new Date(), [Validators.required]],
      passangerCount: [1, [Validators.required, passengerCountValidator()]],
    });

    this.loading = true;

    this.searchForm
      .get('startCity')
      ?.valueChanges.pipe(
        tap((value) => {
          if (value.trim().length === 0) {
            this.startCities = [];
            this.showStartCityList = false;
          }
        }),
        filter((value) => value.trim().length > 0),
        switchMap((value) =>
          this.http.get<any>(`http://localhost:8080/api/get-cities/${value}`),
        ),
      )
      .subscribe((data) => {
        this.startCities = data.filteredCities;
        this.showStartCityList = true;
        this.searchForm
          .get('startCity')
          ?.setValidators([
            Validators.required,
            cityValidator(this.startCities),
          ]);
        this.searchForm
          .get('startCity')
          ?.updateValueAndValidity({ emitEvent: false });
      });

    this.searchForm
      .get('destinationCity')
      ?.valueChanges.pipe(
        tap((value) => {
          if (value.trim().length === 0) {
            this.startCities = [];
            this.showStartCityList = false;
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
        this.searchForm
          .get('destinationCity')
          ?.setValidators([
            Validators.required,
            cityValidator(this.destinationCities),
          ]);
        this.searchForm
          .get('destinationCity')
          ?.updateValueAndValidity({ emitEvent: false });
      });
  }

  handleSearchRides(): void {
    const { startCity, destinationCity, selectedDate, passangerCount } = this.searchForm.value;
    console.log(startCity, destinationCity, selectedDate, passangerCount)
    this.search
      .getAllRides(startCity, destinationCity, selectedDate, passangerCount)
      .subscribe((ridesResponse: RidesResponse) => {
        this.searchedRides = ridesResponse.rides;
      });
  }

  onStartCitySelected(city: string) {
    this.searchForm.get('startCity')?.setValue(city, { emitEvent: false });
    this.startCities = [];
    this.showStartCityList = false;
  }

  onDestinationCitySelected(city: string) {
    this.searchForm
      .get('destinationCity')
      ?.setValue(city, { emitEvent: false });
    this.destinationCities = [];
    this.showDestinationCityList = false;
  }

  onRideClick(rideId: number) {
    console.log(this.searchedRides);
    const ride: Rides | undefined = this.rides.find((r) => r.id === rideId);
    if (!ride) {
      return;
    }
    this.rideSharingService.changeRide(ride);
    this.router.navigate(['/ride-detail', rideId]);
  }

  getRides(): void {
    this.search.getAllRides2().subscribe({
      next: (response: RidesResponse) => {
        this.rides = response.rides;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error getting rides:', error);
      },
    });
  }

  calculateRideDuration(start: string, finish: string): string | null {
    const startDate = new Date(start);
    const finishDate = new Date(finish);

    if (isNaN(startDate.getTime()) || isNaN(finishDate.getTime())) {
      return null;
    }

    const durationMilliseconds = finishDate.getTime() - startDate.getTime();

    const durationHours = Math.floor(durationMilliseconds / (1000 * 60 * 60));
    const durationMinutes = Math.floor(
      (durationMilliseconds / (1000 * 60)) % 60,
    );

    return `${String(durationHours).padStart(2, '0')}:${String(
      durationMinutes,
    ).padStart(2, '0')}`;
  }
}
