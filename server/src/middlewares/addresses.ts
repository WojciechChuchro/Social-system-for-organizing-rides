import {NextFunction, Request, Response} from 'express';
import Addresses from '../database/models/addresses.model';
import Streets from "../database/models/streets.model"; // Assuming this is your correct import

export const createAddress = (req: Request, res: Response, next: NextFunction) => {
    const {zipCode, houseNumber} = req.body;
    const streetId = res.locals.streetId;
    console.log(streetId)
    console.log(zipCode, houseNumber)
    Addresses.query()
        .findOne({zipCode, houseNumber, streetId})
        .then(existingAddress => {
            if (!existingAddress) {
                return Addresses.query().insert({zipCode, houseNumber, streetId});
            }
            return existingAddress;
        })
        .then(existingAddress => {
            res.locals.addressId = existingAddress.id; // Attach the street ID to res.locals
            next();
        })
        .catch(error => {
            console.error('Error:', error);
            return res.status(500).json({message: 'Internal server error'});
        });
};

export const createStartAndDestinationAddress = async (req: Request, res: Response, next: NextFunction) => {
    const { startZipCode, startHouseNumber, destinationZipCode, destinationHouseNumber } = req.body;
    const { startStreetId, destinationStreetId } = res.locals;
    console.log(res.locals)
    try {
        const existingStartAddress = await Addresses.query().findOne({ streetId: startStreetId, zipCode: startZipCode, houseNumber: startHouseNumber });

        if (!existingStartAddress) {
            const newStartAddress = await Addresses.query().insert({ streetId: startStreetId, zipCode: startZipCode, houseNumber: startHouseNumber });
            res.locals.startAddressId = newStartAddress.id;
        } else {
            res.locals.startAddressId = existingStartAddress.id;
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Cannot create an address' });
    }

    try {
        const existingDestinationAddress = await Addresses.query().findOne({ streetId: destinationStreetId, zipCode: destinationZipCode, houseNumber: destinationHouseNumber });

        if (!existingDestinationAddress) {
            const newDestinationAddress = await Addresses.query().insert({ streetId: destinationStreetId, zipCode: destinationZipCode, houseNumber: destinationHouseNumber });
            res.locals.destinationAddressId = newDestinationAddress.id;
        } else {
            res.locals.destinationAddressId = existingDestinationAddress.id;
        }

        next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Cannot create an address' });
    }
};

