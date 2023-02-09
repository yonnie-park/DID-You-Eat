import { Response } from 'express';
import { getResource } from '../../aptosUtils/getResourceTest';

const get_tokens_by_address_service = async (
  address: string,
  res: Response
) => {
  if (!address) {
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });
  }
  const resourceTokens = await getResource(address);
  return res.status(200).send({ status: 'success', message: resourceTokens });
};
export { get_tokens_by_address_service };
