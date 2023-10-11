import express from 'express';
import { authenticateJWT } from '../middlewares';
import {
  acceptRide,
  createRide,
  getRidesByUser,
  getRidesWithDrivers,
  GetRidesByUserAsPassenger,
  getCities, getSearchRides,
} from '../controllers/rides';
import { getMessages } from '../controllers/messages';

export default (router: express.Router) => {
  router.get('/messages/:driverId/:passengerId', getMessages);
};
