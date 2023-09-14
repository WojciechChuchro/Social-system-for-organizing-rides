import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as process from 'process';
import path from 'path';
import { DecodedToken } from '../types/config';

const envFilePath = path.join(__dirname, '../../.env');
dotenv.config({ path: envFilePath });
export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(process.env.SECRET_KEY)
    .digest('hex');
};

export const generateSessionToken = (userId: string): string => {
  const payload = { userId };
  const options = { expiresIn: '72h' };
  return jwt.sign(payload, process.env.SECRET_KEY, options);
};

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY) as DecodedToken;
  } catch (error) {
    return null;
  }
};
