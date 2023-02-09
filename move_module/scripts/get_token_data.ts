import { AptosClient, TokenClient } from 'aptos';
import { minterAccount, RESOURCE_ACCOUNT_ADDR, network } from '../values';

const client = new AptosClient(network.NODE_URL);
const tokenClient = new TokenClient(client);

const main = async () => {
  const tokenData = await tokenClient.getTokenData(
    RESOURCE_ACCOUNT_ADDR,
    'collection_name3',
    'token_name'
  );
  console.log(tokenData);
};
main();
