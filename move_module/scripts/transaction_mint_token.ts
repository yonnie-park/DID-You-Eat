import { AptosClient, AptosAccount, HexString } from 'aptos';
import {
  receiverAccount,
  minterAccount,
  network,
  RESOURCE_ACCOUNT_ADDR,
  module_name,
  mint_token_function_name,
} from '../values';

const main = async () => {
  const receiverPrivateKeyBytes = HexString.ensure(
    receiverAccount.private_key
  ).toUint8Array();
  const receiver = new AptosAccount(receiverPrivateKeyBytes);

  const client = new AptosClient(network.NODE_URL);

  const mint_event_ticket_payload = {
    type: 'entry_function_payload',
    function: `${RESOURCE_ACCOUNT_ADDR}::${module_name}::${mint_token_function_name}`,
    arguments: [minterAccount.maybeHexString, 'collection_name'],
    type_arguments: [],
  };

  const mint_event_ticket_txn = await client.generateTransaction(
    receiver.address(),
    mint_event_ticket_payload
  );
  console.log(mint_event_ticket_txn);
  const signedTxn = await client.signTransaction(
    receiver,
    mint_event_ticket_txn
  );
  const txnRes = await client.submitTransaction(signedTxn);
  console.log(txnRes);
};

main();
