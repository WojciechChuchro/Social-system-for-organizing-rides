import express from 'express'
import {authenticateJWT} from '../middlewares'
import {createRide, getRidesByUser, getRidesWithDrivers} from '../controllers/rides'

export default (router: express.Router) => {
  router.get('/rides', getRidesWithDrivers)
  // router.get("/rides/:id", getRidesWithDrivers)
  router.get('/get-rides', authenticateJWT, getRidesByUser)
  router.post('/create-ride', authenticateJWT, createRide)
}
