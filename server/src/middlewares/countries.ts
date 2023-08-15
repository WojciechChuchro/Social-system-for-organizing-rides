import {NextFunction, Request, Response} from "express"
import Countries from "../database/models/countries.model";


export const createStartAndDestinationCountry = (req: Request, res: Response, next: NextFunction) => {
    const { startCountryName, destinationCountryName } = req.body;

    const processStartCountry = Countries.query()
        .findOne({ countryName: startCountryName })
        .then(existingCountry => {
            if (!existingCountry) {
                return Countries.query().insert({ countryName: startCountryName });
            }
            return existingCountry;
        })
        .then(existingCountry => {
            res.locals.startCountryId = existingCountry.id;
        });

    const processDestinationCountry = Countries.query()
        .findOne({ countryName: destinationCountryName })
        .then(existingCountry => {
            if (!existingCountry) {
                return Countries.query().insert({ countryName: destinationCountryName });
            }
            return existingCountry;
        })
        .then(existingCountry => {
            res.locals.destinationCountryId = existingCountry.id;
        });

    Promise.all([processStartCountry, processDestinationCountry])
        .then(() => {
            next();
        })
        .catch(error => {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Cannot create a country' });
        });
};


