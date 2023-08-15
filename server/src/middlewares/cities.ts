import {NextFunction, Request, Response} from "express"
import Cities from "../database/models/cities.model";


export const createCity = (req: Request, res: Response, next: NextFunction) => {
    const {cityName} = req.body;
    const countryId = res.locals.countryId;
    console.log(countryId)
    console.log(cityName)
    Cities.query()
        .findOne({cityName})
        .then(existingCity => {
            if (!existingCity) {
                return Cities.query().insert({cityName, countryId});
            }
            return existingCity;
        })
        .then(existingCity => {
            res.locals.cityId = existingCity.id; // Attach the country ID to the request object
            next();
        })
        .catch(error => {
            console.error('Error:', error);
            return res.status(500).json({message: 'Cannot create a city'});
        });
};

export const createStartAndDestinationCity = async (req: Request, res: Response, next: NextFunction) => {
    const { startCityName, destinationCityName } = req.body;
    const { startCountryId, destinationCountryId } = res.locals;

    try {
        // Process start city
        const existingStartCity = await Cities.query().findOne({ cityName: startCityName });
        let startCityId: number;

        if (!existingStartCity) {
            const newStartCity = await Cities.query().insert({ cityName: startCityName, countryId: startCountryId });
            startCityId = newStartCity.id;
        } else {
            startCityId = existingStartCity.id;
        }

        // Process destination city
        const existingDestCity = await Cities.query().findOne({ cityName: destinationCityName });
        let destinationCityId: number;

        if (!existingDestCity) {
            const newDestCity = await Cities.query().insert({ cityName: destinationCityName, countryId: res.locals.destinationCountryId });
            destinationCityId = newDestCity.id;
        } else {
            destinationCityId = existingDestCity.id;
        }

        // Set IDs in res.locals and proceed
        res.locals.startCityId = startCityId;
        res.locals.destinationCityId = destinationCityId;
        next();
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Cannot create a city' });
    }
};


