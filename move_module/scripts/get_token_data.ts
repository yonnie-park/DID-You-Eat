import { AptosClient, TokenClient } from 'aptos';
import {
  minterAccount,
  RESOURCE_ACCOUNT_ADDR,
  network,
  receiverAccount,
} from '../values';

const client = new AptosClient(network.NODE_URL);
const tokenClient = new TokenClient(client);

const main = async () => {
  const tokenDataId = {
    creator: RESOURCE_ACCOUNT_ADDR,
    collection: 'collection_name3',
    name: 'token_name',
  };
  const tokenid = {
    property_version: '',
    Token_Id: tokenDataId,
  };
  const tokenData = await tokenClient.getTokenData(
    receiverAccount.maybeHexString,
    'collection_name3',
    'token_name'
  );
  console.log(tokenData);
};
main();
