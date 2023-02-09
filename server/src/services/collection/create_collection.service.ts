import { Response } from 'express';
import { create_collection } from '../../../prisma/scripts/collection';

const create_collection_service = async (body: any, res: Response) => {
  console.log(body);
  if (
    Object.keys(body).length != 5 ||
    !body.shop_name ||
    !body.collection_uri ||
    !body.location ||
    !body.location_detail ||
    !body.owner_address
  ) {
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });
  }
  // transaction
  // db interaction
  const newCollection = await create_collection(body);
  if (!newCollection)
    return res
      .status(500)
      .send({ status: 'failed', message: 'DB interaction Failed' });

  return res
    .status(200)
    .send({ status: 'success', message: 'DB registeration success' });
};

export { create_collection_service };
