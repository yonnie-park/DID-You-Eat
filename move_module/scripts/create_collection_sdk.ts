import { TokenClient, AptosClient, AptosAccount, HexString } from 'aptos';
import { defAccount, network } from '../values';

const main = async () => {
  const client = new AptosClient(network.NODE_URL);
  const tokenClient = new TokenClient(client);

  const defAccPrivateUint8 = HexString.ensure(
    defAccount.private_key
  ).toUint8Array();
  const defAcc = new AptosAccount(defAccPrivateUint8);

  const create_collection_res = await tokenClient.createCollection(
    defAcc,
    'nelCollection2',
    'desc',
    'https://naver.com',
    0
  );
  console.log(create_collection_res);
};
main();
