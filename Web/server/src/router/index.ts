import express from 'express';
import authentication from './authentication';
import users from './users';
import rides from './rides';
import statuses from './statuses';
import messages from './messages';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  rides(router);
  statuses(router);
  messages(router);
  return router;
};
