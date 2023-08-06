import crypto from "crypto"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import * as process from "process";
import path from "path";
const SECRET = "E-COMMERCE-WEBSITE-REST-API"


const envFilePath = path.join(__dirname, "../../.env");
export const random = () => crypto.randomBytes(128).toString("base64")
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex")
}

export const generateSessionToken = (userId: string):string =>  {
  const payload = { userId };
  const options = { expiresIn: "1h" }; // Set the token expiration time, e.g., 1 hour
  return jwt.sign(payload, process.env.SECRET_KEY, options);
}
