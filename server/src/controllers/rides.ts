import { Request, Response } from 'express';
import Users from '../database/models/users.model';
import Rides from '../database/models/rides.model';

export const getAllRides = async (req: Request, res: Response) => {
    try {
        const allRides = await Rides.query();
        return res.status(200).json({ rides: allRides });
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
            modelId,
            earliestDepartureTime,
            latestDepartureTime,
            registrationNumber,
            seatsNumber,
            pricePerPerson,
        } = req.body;

        const parsedModelId = parseInt(modelId);
        const parsedSeatsNumber = parseInt(seatsNumber);
        const parsedPricePerPerson = parseFloat(pricePerPerson);

        if (isNaN(parsedModelId) || isNaN(parsedSeatsNumber) || isNaN(parsedPricePerPerson)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        const newRide = {
            driverId: userId,
            startAddressId: parseInt(res.locals.startAddressId),
            destinationAddressId: parseInt(res.locals.destinationAddressId),
            modelId: parsedModelId,
            earliestDepartureTime,
            latestDepartureTime,
            pricePerPerson: parsedPricePerPerson,
            seatsNumber: parsedSeatsNumber,
            registrationNumber,
        }

        const insertedRide = await Rides.query().insert(newRide);

        return res.status(201).json({ message: 'Ride created successfully', ride: insertedRide });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
