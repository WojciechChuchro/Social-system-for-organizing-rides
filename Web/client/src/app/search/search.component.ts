import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { RideService } from '../../services/ride.service';
import { Rides, RidesResponse } from '../../types/response';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cityValidator} from "../validators";
import {tap} from "rxjs";
import {filter, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchedRides: Rides[] = [];
  searchForm!: FormGroup;
  rides: Rides[] = [];
  userIds: number[] = [];
  // searchTerm: string = 'eao';
  loading: boolean = false;
  startCities: string[] = [];
  destinationCities: string[] = [];
  showStartCityList!: boolean;
  showDestinationCityList!: boolean;
  datePlaceholder: Date | string= new Date();

  constructor(
    private router: Router,
    private search: SearchService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,

  private formBuilder: FormBuilder,
    private rideSharingService: RideService,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      startCity: ['', [Validators.required
        , cityValidator(this.startCities)
      ]],
      destinationCity: [
        '',
        [Validators.required
          , cityValidator(this.destinationCities)
        ],
      ],
      selectedDate: [null, [Validators.required]]
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
          ?.setValidators([Validators.required
            , cityValidator(this.startCities)
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
          ?.setValidators([Validators.required
            , cityValidator(this.destinationCities)
          ]);
        this.searchForm
          .get('destinationCity')
          ?.updateValueAndValidity({ emitEvent: false });
      });

  }

  handleSearchRides(): void {

    const {startCity, destinationCity, selectedDate} = this.searchForm.value
    this.search.getAllRides(startCity, destinationCity, selectedDate)
      .subscribe((ridesResponse: RidesResponse) => {
        this.searchedRides = ridesResponse.rides;
        console.log(this.searchedRides);
      });
  }

  onStartCitySelected(city: string) {
    this.searchForm.get('startCity')?.setValue(city, { emitEvent: false });
    this.startCities = [];
    this.showStartCityList = false;
  }

  onDestinationCitySelected(city: string) {
    this.searchForm.get('destinationCity')?.setValue(city, {emitEvent: false});
    this.destinationCities = [];
    this.showDestinationCityList = false;
  }

  onRideClick(rideId: number) {
    this.router.navigate(['/ride-detail', rideId]);
  }
}
