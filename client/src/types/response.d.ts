import { MessageResponseOnly, Users } from './user';

export interface TokenValidationResponse {
  message: string;
  isValid: boolean;
}

export interface Address {
  zipCode: string;
  id: number;
  street: Street;
  houseNumber: string;
}

export interface Street {
  city: City;
  id: number;
  streetName: string;
}

export interface City {
  id: number;
  cityName: string;
}

export interface DepartureTime {
  earliestDepartureTime: string;
  latestDepartureTime: string;
}

export interface Ride extends DepartureTime {
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

export interface rideWithDriver {
  destinationAddressId: number
  driverId: number
  driver: User;
  earliestDepartureTime: string
  id: number
  latestDepartureTime: string
  pricePerPerson: number
  seatsNumber: number
  startAddressId: number
}

export interface Rides extends DepartureTime {
  id: number;
  driver: User;
  startAddress: Address;
  destinationAddress: Address;
  pricePerPerson: number;
  seatsNumber: number;
  registrationNumber: string;
  duration: string;
  userRides: UserRides[];
  lookingForDrivers: LookingForDrivers[];
}

export interface LookingForDriverResponse extends MessageResponseOnly {
  lookingForDrivers: LookingForDrivers[];
}
export interface LookingForDrivers {
  id: number;
  driverId: number;
  startAddressId: number;
  destinationAddressId: number;
  earliestDepartureTime: string;
  latestDepartureTime: string;
  pricePerPerson: number;
  seatsNumber: number;
}

export interface UserRides extends DepartureTime {
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
  ride: rideWithDriver;
  lookingForDriver: LookingForDriver;
  status: Status;
  startAddress: Address;
  destinationAddress: Address;
  driver: User;
}

export interface RidesPassangers {
  id: number
  lookingForDriver: LookingForDriver
  lookingForDriverId: number
  ride: rideWithDriver
  rideId: number
  status: Status
  statusId:number
  user: Users
  userId:number
}

export interface UserRidesResponse {
  userRides: UserRides[];
}

export interface User {
  id: number;
  carId: number;
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
  profilePicture: string;
  password: string;
  salt: string;
  sessionToken: string;
}

export interface LookingForDriver extends DepartureTime {
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
  message: string;
}
export interface UserRidesResponse {
  userRides: UserRides[];
}
export interface UsersResponse {
  users: Users[];
}
