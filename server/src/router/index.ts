import express from 'express'
import authentication from './authentication'
import users from './users'
import rides from './rides'

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  users(router)
  rides(router)
  return router
}
