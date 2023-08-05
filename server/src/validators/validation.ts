import { authentication } from "../helpers/index"
import { getUserByEmail, getUserByUsername } from "../models/users.model"
import { CustomValidator } from "express-validator"

export const checkUserExistsByEmail = async (email: string) => {
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    throw new Error("User with this email already exists.")
  }
}

export const checkUserExistsByEmailForLogin = async (email: string) => {
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    throw new Error("Wrong data provided.")
  }
}

export const checkUserExistsByUsername = async (username: string) => {
  const existingUser = await getUserByUsername(username)

  if (existingUser) {
    throw new Error("User with this username already exists.")
  }
}

export const checkPassword: CustomValidator = async (
  password: string,
  { req }
) => {
  const { email } = req.body

  try {
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    )

    const expectedHash = authentication(user.authentication.salt, password)

    if (user.authentication.password !== expectedHash) {
      throw new Error("Invalid password")
    }

    return Promise.resolve()
  } catch (err) {
    throw new Error("Internal server error")
  }
}
