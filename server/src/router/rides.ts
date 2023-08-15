import express from "express"
import {authenticateJWT} from "../middlewares";
import {createRide, getAllRides, getRidesWithDrivers} from "../controllers/rides";
import {createStartAndDestinationCountry} from "../middlewares/countries";
import {createStartAndDestinationStreet} from "../middlewares/streets";
import {createStartAndDestinationAddress} from "../middlewares/addresses";
import {createStartAndDestinationCity} from "../middlewares/cities";

export default (router: express.Router) => {
    router.get("/rides", getRidesWithDrivers)
    router.post("/create-ride",
        authenticateJWT,
        createStartAndDestinationCountry,
        createStartAndDestinationCity,
        createStartAndDestinationStreet,
        createStartAndDestinationAddress,
        createRide
    )
}
