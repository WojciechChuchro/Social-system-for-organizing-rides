import express, { Request, Response } from 'express';
import Users from '../database/models/users.model';
import { authentication, generateSessionToken, random } from '../helpers';
import jwt from 'jsonwebtoken';
import { NewUser } from '../types/model';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await Users.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const expectedHash = authentication(user.salt, password);

    if ((await Users.getHashPassword(user.email)) !== expectedHash) {
      return res.status(401).send({ message: 'invalid password' });
    }

    const sessionToken = generateSessionToken(user.id.toString());
    try {
      await Users.updateSessionToken(user, sessionToken);
    } catch (error) {
      return res.status(500).send({ message: 'Internal server error' });
    }

    res.cookie('JsonWebToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'localhost',
      path: '/',
    });

    return res.status(200).json({ message: 'login success' }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, name, surname, phoneNumber } = req.body;

    const user = await Users.getUserByEmail(email);

    if (user) {
      return res
        .status(404)
        .json({ message: 'User with provided email already exists' });
    }

    const salt = random();

    const newUser: NewUser = {
      name,
      surname,
      phoneNumber,
      email,
      password,
      salt,
    };

    try {
      await Users.createUser(newUser);

      return res.status(200).json({ message: 'Register success' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const validateJWT = (req: Request, res: Response): Response | void => {
  const { JsonWebToken } = req.cookies;

  if (!JsonWebToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: Missing token', isValid: false });
  }

  const token: string = Array.isArray(JsonWebToken)
    ? JsonWebToken[0]
    : JsonWebToken;
  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
    return res.status(200).json({ message: 'Token is valid', isValid: true });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: 'Unauthorized: Token has expired',
        isValid: false,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid token', isValid: false });
    }
    return res
      .status(500)
      .json({ message: 'Internal Server Error', isValid: false });
  }
};

export const logout = async (
  req: express.Request,
  res: express.Response,
): Promise<express.Response> => {
  res.cookie('JsonWebToken', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};
