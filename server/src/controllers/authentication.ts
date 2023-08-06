import express from "express"
import {Result, ValidationError, validationResult} from "express-validator"
import Users from "../models/users.model"
import {random, authentication, generateSessionToken} from "../helpers"

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send({
                username: null,
                email: null,
                sessionToken: null,
                errors: errors.array(),
            })
        }
        const user = await Users.getUserByEmail(email)

        const expectedHash = authentication(user.salt, password)
        if (await Users.getHashPassword(user.email) !== expectedHash) {
            console.log("wrong password")
            const errors: Result<ValidationError> = validationResult(req)

            const newError: ValidationError = {
                location: "body",
                value: "password",
                msg: "Wrong data provided.",
                type: "field",
                path: "password",
            }

            const updatedErrors: ValidationError[] = errors.array().concat(newError)

            return res.send({
                username: null,
                email: null,
                sessionToken: null,
                errors: updatedErrors,
            })
        }

        const salt = random()
        const sessionToken = generateSessionToken(user.id.toString())
        await Users.query().findById(user.id).patch({sessionToken});

        res.cookie("E-COMMERCE-WEBSITE-AUTH", sessionToken, {
            domain: "localhost",
            path: "/",
            httpOnly: true,
            secure: true,
        });


        return res.status(200).json({'message': "login success"}).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({
                errors: errors.array(),
            });
        }

        const salt = random()
        const user = await Users.query().insert({
            email,
            password: authentication(salt, password),
            salt
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
