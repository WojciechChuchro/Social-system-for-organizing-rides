import { Model } from 'objection';
import knex from '../config/database';
import Users from './users.model';
import Addresses from './addresses.model';
import UserRides from './userRides.model';
import { login } from "../../controllers/authentication";

Model.knex(knex);

class Rides extends Model {
  id!: number;
  driverId!: number;
  modelId!: number;
  startAddressId!: number;
  destinationAddressId!: number;
  earliestDepartureTime!: string;
  latestDepartureTime!: string;
  pricePerPerson!: number;
  seatsNumber!: number;
  registrationNumber!: string;

  static get rides() {
    return {
      required: [
        'id',
        'driverId',
        'earliestDepartureTime',
        'latestDepartureTime',
        'modelId',
        'startAddressId',
        'seatsNumber',
        'pricePerPerson',
        'registrationNumber',
      ],
      properties: {
        id: { type: 'integer' },
        driverId: { type: 'integer' },
        modelId: { type: 'integer' },
        startAddressId: { type: 'integer' },
        destinationAddressId: { type: 'integer' },
        earliestDepartureTime: { type: 'date-string' },
        latestDepartureTime: { type: 'date-string' },
        registrationNumber: { type: 'string' },
        seatsNumber: { type: 'integer', length: 1 },
        pricePerPerson: { type: 'float', length: 2 },
      },
    };
  }

  static get tableName(): string {
    return 'rides';
  }

  static get relationMappings() {
    return {
      driver: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'rides.driverId',
          to: 'users.id',
        },
      },
      startAddress: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: 'rides.startAddressId',
          to: 'addresses.id',
        },
      },
      destinationAddress: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: 'rides.destinationAddressId',
          to: 'addresses.id',
        },
      },
      userRides: {
        relation: Model.HasManyRelation,
        modelClass: UserRides,
        join: {
          from: 'rides.id',
          to: 'userRides.rideId',
        },
      },
    };
  }



}

export async function getRidesWithFilters(
  startCity: string,
  destinationCity: string,
  selectedDate: string,
  passangerCount: number
) {
  try {
    const ridesQuery = Rides.query()
      .select(['rides.*'])
      .modifiers({
        onlyStartCity(builder) {
          builder.andWhere('cityName', '=', startCity);
        },
        onlyDestinationCity(builder) {
          builder.andWhere('cityName', '=', destinationCity);
        },
        passengerCount(builder) {
          builder.andWhere('rides.seatsNumber', '>=', passangerCount);
        }
      }).withGraphFetched(`[
      startAddress.[street.[city(onlyStartCity)]],
      destinationAddress.[street.[city(onlyDestinationCity)]]
      driver
     
      ]`)
        .modify('passengerCount')
        .orderBy('rides.seatsNumber');

    const rides = await ridesQuery;

    const filteredRidesByStartCity = rides.filter(
      // @ts-ignore
      (ride) => ride.startAddress.street.city !== null && true,
    );
    // @ts-ignore
    const filteredRidesByDestinationCity = filteredRidesByStartCity.filter(
      // @ts-ignore
      (ride) => ride.destinationAddress.street.city !== null && true,
    );
    const selectedDateObj = new Date(selectedDate);
    const selectedDatePart = new Date(
      selectedDateObj.getFullYear(),
      selectedDateObj.getMonth(),
      selectedDateObj.getDate()
    );

    // Filter rides by comparing the date part of earliestDepartureTime with selectedDatePart
    const filteredRidesByDate = filteredRidesByDestinationCity.filter(
      (ride) => {
        // Convert earliestDepartureTime to a date object and get the date part
        const departureDate = new Date(ride.earliestDepartureTime);
        const departureDatePart = new Date(
          departureDate.getFullYear(),
          departureDate.getMonth(),
          departureDate.getDate()
        );

        // Compare date parts
        return departureDatePart.getTime() === selectedDatePart.getTime();
      }
    );

    return filteredRidesByDate;
  } catch (error) {
    console.error('Error getting rides:', error);
    throw error;
  }
}

export async function getRidesByUserId(userId: number): Promise<Rides[]> {
  try {
    return await Rides.query()
      .where('driverId', userId)
      .withGraphFetched(
        '[driver, startAddress.[street.[city]], destinationAddress.[street.[city]], userRides.[user, status]]',
      )
      .orderBy('earliestDepartureTime');
  } catch (error) {
    console.error('Error fetching rides:', error);
    throw error;
  }
}

export const getRidesWithEveryChildrenTable = async () => {
  try {
    return await Rides.query()
      .select([
        'rides.id',
        'rides.earliestDepartureTime',
        'rides.latestDepartureTime',
        'rides.pricePerPerson',
        'rides.seatsNumber',
      ])
      .withGraphFetched(`[
               driver.[cars.[models.[brands]]], startAddress.[street.[city]], 
               destinationAddress.[street.[city]]
               ]`,)
      .whereNotNull('rides.driverId')
      .whereNotNull('rides.startAddressId');
  } catch (error) {
    console.error('Error getting rides:', error);
    throw error;
  }

};
export default Rides;
