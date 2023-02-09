import { Response } from 'express';
import { getUserDataByEmail } from '../../../prisma/scripts/user';
import { getResource } from '../../aptosUtils/getResourceTest';

const get_tokens_by_email_service = async (e_mail: string, res: Response) => {
  if (!e_mail)
    return res.status(400).send({ status: 'failed', message: 'Bad Request' });

  const userData = await getUserDataByEmail(e_mail);
  if (!userData) {
    return res
      .status(200)
      .send({ status: 'failed', message: 'No Matching User' });
  }
  const resourceTokens = await getResource(userData.address);
  return res.status(200).send({ status: 'success', message: resourceTokens });
};

export { get_tokens_by_email_service };
