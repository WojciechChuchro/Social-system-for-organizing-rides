import { NextFunction, Request, Response } from 'express';
import { decodeJWT } from '../helpers';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { JsonWebToken } = req.cookies;

  if (!JsonWebToken) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  const token = Array.isArray(JsonWebToken) ? JsonWebToken[0] : JsonWebToken; // Take the first one if it's an array

  const decodedJwt = decodeJWT(token);

  if (!decodedJwt) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  res.locals.jwt = decodedJwt;
  next();
};
