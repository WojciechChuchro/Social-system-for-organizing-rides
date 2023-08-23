import {Users} from './user'

export interface TokenValidationResponse {
  message: string;
  isValid: boolean;
}

export interface UserRides {
  StatusId: number
  id: number;
  userId: number;
  rideId: number
  lookingForDriverId?: number | null; // Since it can be null, you might want to consider using an optional property (?).
  statusId: number;
  user: Users;
  status: Statuses
}

export interface Statuses {
  id: number,
  isAccepted: number
}

export interface Rides {
  latestDepartureDate: string;
  earliestDepartureDate: string
  id: number;
  driverName: string;
  driverEmail: string;
  driverModelName: string;
  driverBrandName: string;
  startZipCode: string;
  startHouseNumber: string
  startStreetName: string;
  startCityName: string;
  startCountryName: string;
  destinationZipCode: string;
  destinationHouseNumber: string;
  destinationStreetName: string;
  destinationCityName: string;
  destinationCountryName: string;
  earliestDepartureTime: string;
  latestDepartureTime: string;
  earliestDepartureHour: string;
  latestDepartureHour: string;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  duration: string;
  userRides: UserRides[];
}

export interface RidesResponse {
  rides: Rides[];
}

export interface UsersResponse {
  users: Users[];
}
