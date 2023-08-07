import express from "express"

import {getUserById} from "../controllers/users"

export default (router: express.Router) => {
    // router.get("/users", getAllUsers)
    router.get("/users/:id", getUserById)
    // router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
    // router.patch("/users/update", updateUser)
}
