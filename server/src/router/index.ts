import express from "express"
import authentication from "./authentication"
import users from "./users"
import home from "./home";

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  users(router)
  home(router)
  return router
}
