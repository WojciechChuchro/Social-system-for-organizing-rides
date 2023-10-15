import express from 'express';
import { authenticateJWT } from '../middlewares';
import {
  acceptRide,
  createRide,
  getRidesByUser,
  getRidesWithDrivers,
  GetRidesByUserAsPassenger,
  getCities, getSearchRides, getAllLookingForDrivers
} from '../controllers/rides';

export default (router: express.Router) => {
  router.get('/rides/:startCity/:destinationCity/:selectedDate', getSearchRides);
  router.get('/rides', getRidesWithDrivers);
  router.get('/get-rides', authenticateJWT, getRidesByUser);
  router.post('/create-ride', authenticateJWT, createRide);
  router.post('/accept-ride', authenticateJWT, acceptRide);
  router.get(
    '/get-rides-as-passenger',
    authenticateJWT,
    GetRidesByUserAsPassenger,
  );
  router.get('/get-cities/:nameFilter', getCities);
  router.post('/looking-for-drivers', getAllLookingForDrivers)
};
