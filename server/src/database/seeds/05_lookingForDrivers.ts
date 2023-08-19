import {Knex} from 'knex'
import {faker} from '@faker-js/faker'

export async function seed(knex: Knex): Promise<void> {
	await knex('lookingForDrivers').del()

	const lookingForDrivers = []
	const numberOfDrivers = 10


	const existingAddressesIds = await knex('addresses').pluck('id')

	for (let i = 0; i < numberOfDrivers; i++) {
		lookingForDrivers.push({
			startAddressId: existingAddressesIds[faker.number.int({min: 0, max: 9})],
			destinationAddressId: existingAddressesIds[faker.number.int({min: 0, max: 9})],
			earliestDepartureTime: '2020-01-01 10:10:10',
			latestDepartureTime: '2020-01-01 10:10:10',
			maxPrice: faker.number.float({min: 0, max:10}),
			numberOfPeople: faker.number.int({min: 1, max: 4}),
		})
	}
	await knex('lookingForDrivers').del()
	await knex('lookingForDrivers').insert(lookingForDrivers)
}
