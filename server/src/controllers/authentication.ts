// import express from "express"
// import {
//   Result,
//   ValidationError,
//   check,
//   validationResult,
// } from "express-validator"
// import {
//
// } from "../models/users.model"
// import { random, authentication } from "../helpers/index"
//
// export const login = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email: reqEmail, password } = req.body
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.send({
//         username: null,
//         email: null,
//         sessionToken: null,
//         errors: errors.array(),
//       })
//     }
//     const user = await getUserByEmail(reqEmail).select(
//       "+authentication.salt +authentication.password"
//     )
//     const expectedHash = authentication(user.authentication.salt, password)
//
//     if (user.authentication.password !== expectedHash) {
//       const errors: Result<ValidationError> = validationResult(req)
//
//       const newError: ValidationError = {
//         location: "body",
//         value: "password",
//         msg: "Wrong data provided.",
//         type: "field",
//         path: "password",
//       }
//
//       const updatedErrors: ValidationError[] = errors.array().concat(newError)
//
//       return res.send({
//         username: null,
//         email: null,
//         sessionToken: null,
//         errors: updatedErrors,
//       })
//     }
//
//     const salt = random()
//     user.authentication.sessionToken = authentication(salt, user._id.toString())
//
//     await user.save()
//
//     res.cookie("E-COMMERCE-WEBSITE-AUTH", user.authentication.sessionToken, {
//       domain: "localhost",
//       path: "/",
//     })
//
//     const {
//       username,
//       authentication: { sessionToken },
//     } = user
//
//     const userObject = {
//       username,
//       email: reqEmail,
//       sessionToken,
//       errors: errors.array(),
//     }
//
//     return res.status(200).json(userObject).end()
//   } catch (error) {
//     console.log(error)
//     return res.sendStatus(400)
//   }
// }
//
// export const register = async (req: express.Request, res: express.Response) => {
//   try {
//     const { email, password, username } = req.body
//     const errors = validationResult(req)
//
//     if (!errors.isEmpty()) {
//       return res.send({
//         errors: errors.array(),
//       })
//     }
//
//     const salt = random()
//     const user = await createUser({
//       email,
//       username,
//       authentication: {
//         salt,
//         password: authentication(salt, password),
//       },
//     })
//
//     return res.status(200).json(user).end()
//   } catch (error) {
//     console.log(error)
//     return res.sendStatus(400)
//   }
// }
