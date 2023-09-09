export interface AddressIds {
  startAddressId: number;
  destinationAddressId: number;
}

export interface CityIds {
  startCityId: number;
  destinationCityId: number;
}

export interface StreetIds {
  startStreetId: number;
  destinationStreetId: number;
}

export interface NewUser {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  salt: string;
}