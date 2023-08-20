import {Ride} from './ride'
import {Users} from './user'

export interface TokenValidationResponse {
  message: string;
  isValid: boolean;
}
export interface RidesResponse {
  rides: Ride[];
}
export interface UsersResponse {
  users: Users[]
}
