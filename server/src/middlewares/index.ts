import {Request, Response,NextFunction} from "express"
import { get } from "lodash"
import {decodeJWT} from "../helpers";


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  const token = authorization.split(' ')[1];

  const decodedJwt = decodeJWT(token);

  if (!decodedJwt) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  res.locals.jwt = decodedJwt;

  next();
};
export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const currentUserId = get(req, "identity._id") as string

    if (!currentUserId) {
      return res.sendStatus(400)
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403)
    }

    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
