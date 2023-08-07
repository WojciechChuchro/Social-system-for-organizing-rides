import express from "express"

import {getUserByJWT} from "../controllers/users"

export default (router: express.Router) => {
    // router.get("/users", getAllUsers)
    router.get("/users", getUserByJWT)
    // router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
    // router.patch("/users/update", updateUser)
}
