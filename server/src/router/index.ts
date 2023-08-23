import express from 'express'
import authentication from './authentication'
import users from './users'
import rides from './rides'
import statuses from './statuses'

const router = express.Router()

export default (): express.Router => {
  authentication(router)
  users(router)
  rides(router)
  statuses(router)
  return router
}
