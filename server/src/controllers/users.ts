import {Request, Response} from 'express';
import Users from "../models/users.model";
import {authentication} from "../helpers";


export const updateUserByJWT = async (req: Request, res: Response) => {
    try {
        const {email, name, surname, phoneNumber, password} = req.body

        const decodedJwt = req.decodedJwt;

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

        const decodedJwt = res.locals.jwt;
        console.log('jwt deco',decodedJwt);
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