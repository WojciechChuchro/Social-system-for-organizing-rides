import express from "express"

import {getUserByJWT, getUsersByIds, updateUserByJWT} from "../controllers/users"
import {authenticateJWT} from "../middlewares";

export default (router: express.Router) => {
    router.post("/users",  getUsersByIds)
    router.get("/user", authenticateJWT, getUserByJWT)
    // router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
    router.patch("/users/update", authenticateJWT, updateUserByJWT)
}
