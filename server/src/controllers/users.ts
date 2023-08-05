import express from "express"
import {
  getUsers,
  deleteUserById,
  getUserById,
  getUserBySessionToken,
} from "../models/users.model"
import { authentication } from "../helpers"

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers()
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params

    const deletedUser = await deleteUserById(id)

    return res.json(deletedUser)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { password, sessionToken, username, email } = req.body
    const user = await getUserBySessionToken(sessionToken).select(
      "+authentication.salt +authentication.password"
    )
    console.log("sdf")
    if (!user) {
      return res.sendStatus(400)
    }

    const expectedHash = authentication(user.authentication.salt, password)

    if (user.authentication.password !== expectedHash) {
      console.log("sdf")
      return res.sendStatus(403)
    }

    if (username) user.username = username

    if (email) user.email = email

    await user.save()

    const { username: updatedUsername, email: updatedEmail } = user

    const userObject = { username: updatedUsername, email: updatedEmail }

    return res.status(200).json(userObject).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
