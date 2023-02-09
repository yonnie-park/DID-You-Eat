import { Response } from 'express';
import { generateAccount } from '../../aptosUtils/create_aptos_account';
import {
  createUserDataByEmail,
  getUserDataByEmail,
} from '../../../prisma/scripts/user';

const userEmailAuth = async (res: Response, e_mail: string) => {
  const userData = await getUserDataByEmail(e_mail);
  if (userData) {
    return res.status(200).send({
      status: 'success',
      message: {
        public_key: userData.public_key,
        address: userData.address,
      },
    });
  }
  const newAptosAccount = generateAccount();
  const { address, pubkey, prikey } = newAptosAccount;

  const newUser = await createUserDataByEmail(e_mail, address, pubkey, prikey);
  return res.status(200).send({
    status: 'success',
    message: { public_key: newUser!.public_key, address: newUser!.address },
  });
};

export { userEmailAuth };
