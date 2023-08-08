import express from "express"

import {getUserByJWT, updateUserByJWT} from "../controllers/users"
import {authenticateJWT} from "../middlewares";

export default (router: express.Router) => {
    // router.get("/users", getAllUsers)
    router.get("/users", authenticateJWT, getUserByJWT)
    // router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
    router.patch("/users/update", authenticateJWT, updateUserByJWT)
}
