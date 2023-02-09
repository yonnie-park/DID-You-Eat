import { Response } from 'express';
import { get_collections_by_address } from '../../../prisma/scripts/collection';

const get_collections_service = async (address: string, res: Response) => {
  if (!address)
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });
  try {
    const collections = get_collections_by_address(address);
    return res.status(200).send({ status: 'success', message: collections });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 'failed', message: 'Interneal error' });
  }
};

export { get_collections_service };
