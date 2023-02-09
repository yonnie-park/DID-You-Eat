import { Response } from 'express';
import { getUserDataByEmail } from '../../../prisma/scripts/user';
import { mint_token } from '../../aptosUtils/mint_token';

const mint_token_service = async (body: any, res: Response) => {
  const { email, owner_address, collection_name } = body;
  const userData = await getUserDataByEmail(email);
  if (!userData) {
    return res.status(200).send({ status: 'failed', message: 'No user exist' });
  }

  console.log(userData);
  const mintRes = await mint_token(
    userData.private_key,
    owner_address,
    collection_name
  );
  if (!mintRes) {
    return res.status(500).send({ status: 'failed', message: 'Mint Failed' });
  }
  return res.status(200).send({
    status: 'success',
    message: `https://explorer.aptoslabs.com/account/${userData.address}/resources`,
  });
};
export { mint_token_service };
