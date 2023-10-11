import { Request, Response } from 'express';
import Messages from '../database/models/messages.model';

export const getMessages = async (req: Request, res: Response) => {

  const { driverId, passengerId } = req.params;
  const { getMessagesByDriverAndPassenger } = Messages;

  try {
    const messages = await getMessagesByDriverAndPassenger(driverId, passengerId);

    return res.status(200).json({ message: "Success", messages: messages   });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};