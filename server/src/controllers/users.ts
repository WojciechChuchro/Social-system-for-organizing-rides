import {Request, Response} from 'express';
import Users from "../models/users.model";
import {authentication, decodeJWT} from "../helpers";


export const updateUserByJWT = async (req: Request, res: Response) => {
    console.log("updateUserByJWT")
    try {
        const {authorization} = req.headers;
        const {email, name, surname, phoneNumber, password} = req.body
        const decodedJwt = decodeJWT(authorization)

        if (!decodedJwt) {
            return res.status(401).json({message: 'Unauthorized: Invalid token'});
        }

        const user = await Users.query().findById(decodedJwt.userId).select('email', 'name', 'surname', 'phoneNumber', 'profilePicture', 'salt');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const expectedHash = authentication(user.salt, password)
        if (await Users.getHashPassword(user.email) !== expectedHash) {
            return res.status(401).send({message: 'Invalid password'})
        }
        // Update the user's fields with the provided data
        const updatedUserData = {
            email: email || user.email,
            name: name || user.name,
            surname: surname || user.surname,
            phoneNumber: phoneNumber || user.phoneNumber,
        };

        // Perform the update
        await Users.query().findById(decodedJwt.userId).patch(updatedUserData);

        // Fetch the updated user data after the update
        await Users.query().findById(decodedJwt.userId).select('email', 'name', 'surname', 'phoneNumber', 'profilePicture', 'salt');

        return res.status(200).json({message: "User updated"});
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}

export const getUserByJWT = async (req: Request, res: Response) => {
    try {

        const {authorization} = req.headers
        const decodedJwt = decodeJWT(authorization)

        if (!decodedJwt) {
            return res.status(401).json({message: 'Unauthorized: Invalid token'});
        }

        const user = await Users.query().findById(decodedJwt.userId).select('email', 'name', 'surname', 'phoneNumber', 'profilePicture');

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json(user)
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
// export const getAllUsers = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const users = await getUsers()
//     return res.status(200).json(users)
//   } catch (error) {
//     console.log(error)
//     return res.sendStatus(400)
//   }
// }
// export const deleteUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.params
//
//     const deletedUser = await deleteUserById(id)
//
//     return res.json(deletedUser)
//   } catch (error) {
//     console.log(error)
//     return res.sendStatus(400)
//   }
// }
//
// export const updateUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { password, sessionToken, username, email } = req.body
//     const user = await getUserBySessionToken(sessionToken).select(
//       "+authentication.salt +authentication.password"
//     )
//     console.log("sdf")
//     if (!user) {
//       return res.sendStatus(400)
//     }
//
//     const expectedHash = authentication(user.authentication.salt, password)
//
//     if (user.authentication.password !== expectedHash) {
//       console.log("sdf")
//       return res.sendStatus(403)
//     }
//
//     if (username) user.username = username
//
//     if (email) user.email = email
//
//     await user.save()
//
//     const { username: updatedUsername, email: updatedEmail } = user
//
//     const userObject = { username: updatedUsername, email: updatedEmail }
//
//     return res.status(200).json(userObject).end()
//   } catch (error) {
//     console.log(error)
//     return res.sendStatus(400)
//   }
// }
