import {Users} from './user'

export interface TokenValidationResponse {
  message: string;
  isValid: boolean;
}

export interface Address {
  zipCode: string;
  houseNumber: string;
  streetName: string;
  cityName: string;
  countryName: string;
}

export interface TimeWindow {
  earliestDepartureTime: string;
  latestDepartureTime: string;
  earliestDepartureDate?: string;
  latestDepartureDate?: string;
  earliestDepartureHour?: string;
  latestDepartureHour?: string;
}

export interface Ride extends TimeWindow {
  id: number;
  driverId: number;
  driverName: string;
  driverEmail: string;
  driverModelName: string;
  driverBrandName: string;
  startAddress: Address;
  destinationAddress: Address;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  duration?: string;
}

export interface Rides extends TimeWindow {
  id: number;
  driverName: string;
  driverEmail: string;
  driverModelName: string;
  driverBrandName: string;
  startAddress: Address;
  destinationAddress: Address;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  duration: string;
  userRides: UserRides[];
}

export interface UserRides extends TimeWindow {
  id: number;
  userId: number;
  lookingForDriverId?: number | null;
  rideId: number;
  statusId: number;
  driverId: number;
  startAddressId: number;
  destinationAddressId: number;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  user: Users;
  ride: Ride;
  lookingForDriver: LookingForDriver;
  status: Status;
}

export interface UserRidesResponse {
  userRides: UserRides[];
}

export interface User {
  id: number;
  modelId: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  profilePicture: string;
  password: string;
  salt: string;
  sessionToken: string;
}

export interface LookingForDriver extends TimeWindow {
  id: number;
  startAddressId: number;
  destinationAddressId: number;
  maxPrice: number;
  numberOfPeople: number;
}

export interface Status {
  id: number;
  isAccepted: number;
}

export interface RidesResponse {
  rides: Rides[];
}
export interface UserRidesResponse {
  userRides: UserRides[];
}
export interface UsersResponse {
  users: Users[];
}
