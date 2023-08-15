import {Request, Response, NextFunction} from "express"
import {decodeJWT} from "../helpers";


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Unauthorized: Missing token'});
    }

    const token = authorization.split(' ')[1];

    const decodedJwt = decodeJWT(token);

    if (!decodedJwt) {
        return res.status(401).json({message: 'Unauthorized: Invalid token'});
    }

    res.locals.jwt = decodedJwt;
    next();
};
