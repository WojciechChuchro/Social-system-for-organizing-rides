export interface Ride {
  latestDepartureDate: string
  earliestDepartureDate: string
  id: number;
  driverName: string;
  driverEmail: string;
  driverModelName: string;
  driverBrandName: string;
  startZipCode: string;
  startHouseNumber: string;
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
}
