import { Response } from 'express';
import { get_collection_by_shop_name } from '../../../prisma/scripts/collection';

const get_collection_detail_service = async (
  shop_name: string,
  res: Response
) => {
  if (!shop_name)
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });
  const collections = await get_collection_by_shop_name(shop_name);
  if (collections)
    return res.status(200).send({ status: 'success', message: collections });
  return res.status(500).send({ status: 'failed', message: 'Interneal error' });
};

export { get_collection_detail_service };
