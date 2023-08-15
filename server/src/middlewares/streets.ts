import {NextFunction, Request, Response} from 'express';
import Streets from '../database/models/streets.model';

export const createStreet = (req: Request, res: Response, next: NextFunction) => {
    const {streetName} = req.body;
    const cityId = res.locals.cityId

    Streets.query()
        .findOne({streetName})
        .then(existingStreet => {
            if (!existingStreet) {
                return Streets.query().insert({streetName, cityId});
            }
            return existingStreet;
        })
        .then(existingStreet => {
            res.locals.streetId = existingStreet.id; // Attach the street ID to res.locals
            next();
        })
        .catch(error => {
            console.error('Error:', error);
            return res.status(500).json({message: 'Cannot create a street'});
        });
};

export const createStartAndDestinationStreet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startStreetName, destinationStreetName } = req.body;
        const { startCityId, destinationCityId } = res.locals;

        const existingStartStreet = await Streets.query().findOne({ streetName: startStreetName });

        if (!existingStartStreet) {
            const newStartStreet = await Streets.query().insert({ streetName: startStreetName, cityId: startCityId });
            res.locals.startStreetId = newStartStreet.id;
        } else {
            res.locals.startStreetId = existingStartStreet.id;
        }

        const existingDestinationStreet = await Streets.query().findOne({ streetName: destinationStreetName });

        if (!existingDestinationStreet) {
            const newDestinationStreet = await Streets.query().insert({ streetName: destinationStreetName, cityId: destinationCityId });
            res.locals.destinationStreetId = newDestinationStreet.id;
        } else {
            res.locals.destinationStreetId = existingDestinationStreet.id;
        }

        next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Cannot create a street' });
    }
};


