import { AptosClient, TokenClient } from 'aptos';
import { RESOURCE_ACCOUNT_ADDR, network } from '../values';

const client = new AptosClient(network.NODE_URL);
const tokenClient = new TokenClient(client);

const main = async () => {
  const collectionData = await tokenClient.getCollectionData(
    RESOURCE_ACCOUNT_ADDR,
    'collection_name3'
  );
  console.log(collectionData);
};
main();
