import { AptosAccount, AptosClient, HexString } from 'aptos';
import {
  MINT_TOKEN_FUNCTION_NAME,
  MODULE_NAME,
  network,
  RESOURCE_ACCOUNT_ADDR,
} from './values';

const mint_token = async (
  private_key: string,
  owner_address: string,
  collection_name: string
) => {
  try {
    const receiverPrivateKeyBytes =
      HexString.ensure(private_key).toUint8Array();
    const receiver = new AptosAccount(receiverPrivateKeyBytes);

    const client = new AptosClient(network.NODE_URL);

    const mint_token_payload = {
      type: 'entry_function_payload',
      function: `${RESOURCE_ACCOUNT_ADDR}::${MODULE_NAME}::${MINT_TOKEN_FUNCTION_NAME}`,
      arguments: [owner_address, collection_name],
      type_arguments: [],
    };

    const mint_token_txn = await client.generateTransaction(
      receiver.address(),
      mint_token_payload
    );
    const signedTxn = await client.signTransaction(receiver, mint_token_txn);
    const txnRes = await client.submitTransaction(signedTxn);
    return txnRes;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { mint_token };
