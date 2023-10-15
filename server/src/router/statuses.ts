import express from 'express';
import { authenticateJWT } from '../middlewares';
import { acceptPassenger, deletePassenger } from '../controllers/statuses';

export default (router: express.Router) => {
  router.post('/accept', authenticateJWT, acceptPassenger);
  router.post('/delete', authenticateJWT, deletePassenger);
};
