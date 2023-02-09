import { AptosClient } from 'aptos';
import { MODULE_NAME, network, RESOURCE_ACCOUNT_ADDR } from './values';

const getResource = async (address: string) => {
  const client = new AptosClient(network.NODE_URL);
  try {
    const resources = await client.getAccountResource(
      address,
      `${RESOURCE_ACCOUNT_ADDR}::${MODULE_NAME}::TokenStore`
    );
    return resources.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export { getResource };
