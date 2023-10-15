import Statuses from '../database/models/statuses.model';
import { Request, Response } from 'express';

export const acceptPassenger = async (req: Request, res: Response) => {
  console.log(req.body);
  const { statusId } = req.body;
  try {
    // Update the isAccepted field to 1
    const status = await Statuses.query()
      .patch({ isAccepted: 1 })
      .findById(statusId);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }

    return res.status(200).json({ message: 'Passenger accepted successfully' });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: 'Error occurred', error: err.message });
  }
};

export const deletePassenger = async (req: Request, res: Response) => {
  console.log(req.body);
  const { statusId } = req.body;
  try {
    const status = await Statuses.query()
      .patch({ isAccepted: 0 })
      .findById(statusId);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }

    return res.status(200).json({ message: 'Passenger deleted successfully' });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: 'Error occurred', error: err.message });
  }
};
