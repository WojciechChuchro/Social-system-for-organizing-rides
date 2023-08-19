import express from 'express'
import Users from '../database/models/users.model'
import {authentication, generateSessionToken, random} from '../helpers'

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const {email, password} = req.body
		const user = await Users.getUserByEmail(email)

		if (!user) {
			return res.status(404).json({message: 'User not found'})
		}

		const expectedHash = authentication(user.salt, password)

		if (await Users.getHashPassword(user.email) !== expectedHash) {
			return res.status(401).send({message: 'invalid password'})
		}

		const sessionToken = generateSessionToken(user.id.toString())
		await Users.query().findById(user.id).patch({sessionToken})

		return res.status(200).json({'message': 'login success', 'token': sessionToken}).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}


export const register = async (req: express.Request, res: express.Response) => {
	try {
		const {email, password, name, surname, phoneNumber} = req.body

		const user = await Users.getUserByEmail(email)

		if (user) {
			return res.status(404).json({message: 'User with provided email already exists'})
		}

		const salt = random()
		await Users.query().insert({
			name,
			surname,
			phoneNumber,
			email,
			password: authentication(salt, password),
			salt,
			modelId: 5,
		})


		return res.status(200).json({'message': 'Register success'}).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
