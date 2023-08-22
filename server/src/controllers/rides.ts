import {Request, Response} from 'express'
import Users from '../database/models/users.model'
import Rides, {getRidesByUserId, getRidesWithEveryChildrenTable,} from '../database/models/rides.model'
import {createStartAndDestinationAddress} from '../database/models/addresses.model'
import {createStartAndDestinationCountry} from '../database/models/countries.model'
import {createStartAndDestinationCity} from '../database/models/cities.model'
import {createStartAndDestinationStreet} from '../database/models/streets.model'
import {AddressIds, CityIds, CountryIds, StreetIds} from '../types/model'
import userRides from '../database/models/userRides.model'
import Statuses from '../database/models/statuses.model'

export const getAllRides = async (req: Request, res: Response) => {
  try {
    const allRides = await Rides.query()
    return res.status(200).json({rides: allRides})
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({message: 'Internal server error'})
  }
}

export const getRidesWithDrivers = async (req: Request, res: Response) => {
  try {
    const ridesData = await getRidesWithEveryChildrenTable() // Call the data function with the id
    return res.status(200).json({rides: ridesData})
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({message: 'Internal server error'})
  }
}

export const createRide = async (req: Request, res: Response) => {
  const {userId} = res.locals.jwt

  try {
    const user = await Users.query().findById(userId)

    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }

    const {
      modelId,
      earliestDepartureTime,
      latestDepartureTime,
      registrationNumber,
      seatsNumber,
      pricePerPerson,
      startZipCode,
      startHouseNumber,
      destinationZipCode,
      destinationHouseNumber,
      startCityName,
      destinationCityName,
      startCountryName,
      destinationCountryName,
      startStreetName,
      destinationStreetName,
    } = req.body

    const parsedModelId = parseInt(modelId)
    const parsedSeatsNumber = parseInt(seatsNumber)
    const parsedPricePerPerson = parseFloat(pricePerPerson)

    if (
      isNaN(parsedModelId) ||
      isNaN(parsedSeatsNumber) ||
      isNaN(parsedPricePerPerson)
    ) {
      return res.status(400).json({message: 'Invalid data format'})
    }
    const countryIds: CountryIds = await createStartAndDestinationCountry(
      startCountryName,
      destinationCountryName
    )

    const cityIds: CityIds = await createStartAndDestinationCity(
      startCityName,
      destinationCityName,
      countryIds.startCountryId, // Provide the appropriate IDs here
      countryIds.destinationCountryId // Provide the appropriate IDs here
    )

    const streetIds: StreetIds = await createStartAndDestinationStreet(
      startStreetName,
      destinationStreetName,
      cityIds.startCityId, // Provide the appropriate IDs here
      cityIds.destinationCityId // Provide the appropriate IDs here
    )
    const addressIds: AddressIds = await createStartAndDestinationAddress(
      startZipCode,
      startHouseNumber,
      destinationZipCode,
      destinationHouseNumber,
      streetIds.startStreetId, // Provide the appropriate IDs here
      streetIds.destinationStreetId // Provide the appropriate IDs here
    )

    const newRide = {
      driverId: userId,
      startAddressId: addressIds.startAddressId,
      destinationAddressId: addressIds.destinationAddressId,
      earliestDepartureTime,
      latestDepartureTime,
      pricePerPerson: parsedPricePerPerson,
      seatsNumber: parsedSeatsNumber,
      registrationNumber,
    }

    const insertedRide = await Rides.query().insert(newRide)

    return res
      .status(201)
      .json({message: 'Ride created successfully', ride: insertedRide})
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({message: 'Internal server error'})
  }
}

export const getRidesByUser = async (req: Request, res: Response) => {
  const {userId} = res.locals.jwt
  // Ensure userId is a valid number
  if (isNaN(userId)) {
    return res.status(400).json({message: 'Invalid user ID format'})
  }

  try {
    const userRides = await getRidesByUserId(userId)

    if (userRides.length === 0) {
      return res.status(404).json({message: 'No rides found for this user.'})
    }

    return res.status(200).json({rides: userRides})
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({message: 'Internal server error'})
  }
}
interface StatusesInterface {
  id: number,
  isAccepted: number
}
export const acceptRide = async (req: Request, res: Response) => {
  const {userId} = res.locals.jwt

  // Parse the user ID and ensure it's a valid number
  const parsedUserId = parseInt(userId, 10)
  if (isNaN(parsedUserId)) {
    return res.status(400).json({message: 'Invalid user ID format'})
  }

  // You need to get these values, either from request body or some other source
  const {rideId} = req.body

  // Parse rideId and statusId
  const parsedRideId = parseInt(rideId, 10)
  

  try {
    const existingReservation = await userRides.query()
      .where({
        userId: parsedUserId,
        rideId: parsedRideId
      })
      .first()

    if (existingReservation) {
      return res.status(409).json({ message: 'You have already reserved this ride!' })
    }
    const newStatus: StatusesInterface = await Statuses.query().insertAndFetch({ isAccepted: 0 }) // Assuming false represents a ride not accepted yet
    
    const newRideRequest = await userRides.query().insert({
      userId: parsedUserId,
      rideId: parsedRideId,
      statusId: newStatus.id, 
      lookingForDriverId: null 
    })

    res.status(201).json({message: 'Ride request added successfully!', data: newRideRequest})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error inserting ride request.'})
  }
}

export const getPassagers = async (req: Request, res: Response) => {
  const { userId } = res.locals.jwt
  console.log(userId)
  const { rideIds } = req.body  // Now expecting an array of rideIds

  if (!rideIds || rideIds.length === 0) {
    return res.status(400).json({ message: 'rideIds array is required in the request body.' })
  }

  try {
    // Check if all the rides belong to the authenticated driver
    const rides = await Rides.query().whereIn('id', rideIds)

    console.log(rides)
    if (rides.length !== rideIds.length) {
      return res.status(400).json({ message: 'Some provided rideIds are not valid.' })
    }

    for (const ride of rides) {
      if (ride.driverId !== parseInt(userId)) {
        return res.status(403).json({ message: 'You are not authorized to access passengers for all the provided rides.' })
      }
    }

    // Fetch the passengers (users) associated with the rides
    const passengers = await userRides.query()
      .join('users', 'userRides.userId', 'users.id')
      .whereIn('userRides.rideId', rideIds)
      .select('users.*')

    res.status(200).json(passengers)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching passengers for the rides.' })
  }
}








