import { Request, Response } from 'express';
import Users from '../database/models/users.model';
import Rides, {
  getRidesByUserId,
  getRidesWithEveryChildrenTable,
} from '../database/models/rides.model';
import { createStartAndDestinationAddress } from '../database/models/addresses.model';
import { createStartAndDestinationCity } from '../database/models/cities.model';
import { createStartAndDestinationStreet } from '../database/models/streets.model';
import { getRidesWithFilters } from '../database/models/rides.model'
import { AddressIds, CityIds, StreetIds } from '../types/model';
import userRides, {
  getUserRidesByUserId,
} from '../database/models/userRides.model';
import Statuses from '../database/models/statuses.model';
import LookingForDrivers from '../database/models/lookingForDrivers.model';

export const getAllRides = async (req: Request, res: Response) => {
  try {
    const allRides = await Rides.query();
    return res.status(200).json({ rides: allRides });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRidesWithDrivers = async (req: Request, res: Response) => {
  try {
    const ridesData = await getRidesWithEveryChildrenTable();
    return res.status(200).json({ rides: ridesData });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createRide = async (req: Request, res: Response) => {

  const { userId } = res.locals.jwt;
  try {
    const user = await Users.query().findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      earliestDepartureTime,
      latestDepartureTime,
      registrationNumber,
      seatsNumber,
      pricePerPerson,
      startZipCode,
      startHouseNumber,
      startCityName,
      destinationCityName,
      startStreetName,
    } = req.body;
    const parsedSeatsNumber = parseInt(seatsNumber);
    const parsedPricePerPerson = parseFloat(pricePerPerson);

    if (isNaN(parsedSeatsNumber) || isNaN(parsedPricePerPerson)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    const cityIds: CityIds = await createStartAndDestinationCity(
      startCityName,
      destinationCityName,
    );

    // todo: What should I do with destination address
    const streetIds: StreetIds = await createStartAndDestinationStreet(
      startStreetName,
      "Not specified",
      cityIds.startCityId,
      cityIds.destinationCityId,
    );

    const addressIds: AddressIds = await createStartAndDestinationAddress(
      startZipCode,
      startHouseNumber,
      "00-000",
      "0",
      streetIds.startStreetId,
      streetIds.destinationStreetId,
    );

    const newRide = {
      driverId: userId,
      startAddressId: addressIds.startAddressId,
      destinationAddressId: addressIds.destinationAddressId,
      earliestDepartureTime,
      latestDepartureTime,
      pricePerPerson: parsedPricePerPerson,
      seatsNumber: parsedSeatsNumber,
      registrationNumber,
    };

    const insertedRide = await Rides.query().insert(newRide);

    return res
      .status(201)
      .json({ message: 'Ride created successfully', ride: insertedRide });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const GetRidesByUserAsPassenger = async (
  req: Request,
  res: Response,
) => {
  const { userId } = res.locals.jwt;

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user Id format' });
  }

  try {
    const userRides = await getUserRidesByUserId(userId);

    return res.status(200).json({ userRides });
  } catch (error) {
    console.error('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRidesByUser = async (req: Request, res: Response) => {

  const { userId } = res.locals.jwt;

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const rides = await getRidesByUserId(userId);
    if (rides.length === 0) {
      return res.status(404).json({ message: 'No rides found for this user.' });
    }

    return res.status(200).json({ rides: rides });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

interface StatusesInterface {
  id: number;
  isAccepted: number;
}

export const acceptRide = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt;

  const parsedUserId = parseInt(userId, 10);
  if (isNaN(parsedUserId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  const { rideId } = req.body;
  const parsedRideId = parseInt(rideId, 10);

  try {
    const existingReservation = await userRides
      .query()
      .where({
        userId: parsedUserId,
        rideId: parsedRideId,
      })
      .first();

    if (existingReservation) {
      return res
        .status(409)
        .json({ message: 'You have already reserved this ride!' });
    }
    const newStatus: StatusesInterface = await Statuses.query().insertAndFetch({
      isAccepted: 0,
    });
    const newUserRide = {
      userId: parsedUserId,
      rideId: parsedRideId,
      statusId: newStatus.id,
      lookingForDriverId: null as null,
    };

    await userRides.query().insert(newUserRide);
    res.status(201).json({ message: 'You have send request for ride!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting ride request.' });
  }
};
export const getCities = async (req: Request, res: Response) => {
  const { nameFilter } = req.params;
  const largestPolishCities = [
    'Warszawa',
    'Kraków',
    'Łódź',
    'Wrocław',
    'Poznań',
    'Gdańsk',
    'Szczecin',
    'Bydgoszcz',
    'Lublin',
    'Katowice',
    'Białystok',
    'Gdynia',
    'Częstochowa',
    'Radom',
    'Sosnowiec',
    'Toruń',
    'Kielce',
    'Gliwice',
    'Zabrze',
    'Bytom',
    'Olsztyn',
    'Bielsko-Biała',
    'Rzeszów',
    'Ruda Śląska',
    'Rybnik',
    'Tychy',
    'Dąbrowa Górnicza',
    'Opole',
    'Elbląg',
    'Płock',
    'Wałbrzych',
    'Gorzów Wielkopolski',
    'Włocławek',
    'Tarnów',
    'Chorzów',
    'Koszalin',
    'Kalisz',
    'Legnica',
    'Grudziądz',
    'Słupsk',
  ];
  try {
    const filteredCities = largestPolishCities.filter((city) =>
      city.toLowerCase().includes(nameFilter.toLowerCase()),
    );

    res.status(200).json({ filteredCities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting ride request.' });
  }
};

export const getSearchRides = async (req: Request, res: Response) => {
  const {startCity, destinationCity, selectedDate} = req.params;

  try {
    const rides = await getRidesWithFilters(startCity, destinationCity, selectedDate);

    res.status(200).json({ rides, message: "Success" });
  }
 catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting ride request.' });
  }
};

export const getAllLookingForDrivers = async (req: Request, res: Response) => {
  const {pricePerPerson, seatsNumber, startCityName, destinationCityName, departureTime} = req.body

  console.log(pricePerPerson, seatsNumber, startCityName, destinationCityName, departureTime);

  try {
  const lookingForDrivers = await LookingForDrivers.getAllLookingForDrivers()

  return res.status(200).json({message: "Success", lookingForDrivers})

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error fetching looking for drivers.'})
  }
}
