import {Request, Response} from 'express';
import Users from '../database/models/users.model';
import Rides, {getRidesWithEveryChildrenTable} from '../database/models/rides.model';
import {AddressIds, createStartAndDestinationAddress} from "../database/models/addresses.model";
import {CountryIds, createStartAndDestinationCountry} from "../database/models/countries.model";
import {CityIds, createStartAndDestinationCity} from "../database/models/cities.model";
import {createStartAndDestinationStreet, StreetIds} from "../database/models/streets.model";

export const getAllRides = async (req: Request, res: Response) => {
    try {
        const allRides = await Rides.query();
        return res.status(200).json({rides: allRides});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};

export const getRidesWithDrivers = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const ridesData = await getRidesWithEveryChildrenTable(parseInt(id)); // Call the data function with the id
        console.log(ridesData)
        return res.status(200).json({ rides: ridesData });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createRide = async (req: Request, res: Response) => {
    const {userId} = res.locals.jwt;

    try {
        const user = await Users.query().findById(userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const {
            modelId,
            earliestDepartureTime,
            latestDepartureTime,
            registrationNumber,
            seatsNumber,
            pricePerPerson,
            startZipCode,
            startHouseNumber,
            destinationZipCode,
            destinationHouseNumber,
            startCityName,
            destinationCityName,
            startCountryName,
            destinationCountryName,
            startStreetName,
            destinationStreetName
        } = req.body;

        const parsedModelId = parseInt(modelId);
        const parsedSeatsNumber = parseInt(seatsNumber);
        const parsedPricePerPerson = parseFloat(pricePerPerson);

        if (isNaN(parsedModelId) || isNaN(parsedSeatsNumber) || isNaN(parsedPricePerPerson)) {
            return res.status(400).json({message: 'Invalid data format'});
        }
        const countryIds: CountryIds = await createStartAndDestinationCountry(startCountryName, destinationCountryName);

        const cityIds: CityIds = await createStartAndDestinationCity(startCityName, destinationCityName, countryIds.startCountryId, // Provide the appropriate IDs here
            countryIds.destinationCountryId // Provide the appropriate IDs here
        );

        const streetIds: StreetIds = await createStartAndDestinationStreet(startStreetName, destinationStreetName, cityIds.startCityId, // Provide the appropriate IDs here
            cityIds.destinationCityId // Provide the appropriate IDs here
        );
        const addressIds: AddressIds = await createStartAndDestinationAddress(startZipCode, startHouseNumber, destinationZipCode, destinationHouseNumber, streetIds.startStreetId, // Provide the appropriate IDs here
            streetIds.destinationStreetId // Provide the appropriate IDs here
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

        return res.status(201).json({message: 'Ride created successfully', ride: insertedRide});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
};
