import express from "express"

import {getUserByJWT, updateUserByJWT} from "../controllers/users"

export default (router: express.Router) => {
    // router.get("/users", getAllUsers)
    router.get("/users", getUserByJWT)
    // router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
    router.patch("/users/update", updateUserByJWT)
}
