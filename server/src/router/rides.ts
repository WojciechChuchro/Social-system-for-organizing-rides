import express from "express"
import {authenticateJWT} from "../middlewares";
import {createRide, getAllRides, getRidesWithDrivers} from "../controllers/rides";

export default (router: express.Router) => {
    router.get("/rides", getAllRides)
    router.get("/rides/:id", getRidesWithDrivers)
    router.post("/create-ride", authenticateJWT, createRide)
}
