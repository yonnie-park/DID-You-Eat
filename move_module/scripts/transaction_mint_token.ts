import { AptosClient, AptosAccount, HexString } from 'aptos';
import { receiverAccount, minterAccount, network } from '../values';

const main = async () => {
  const receiverPrivateKeyBytes = HexString.ensure(
    receiverAccount.private_key
  ).toUint8Array();
  const receiver = new AptosAccount(receiverPrivateKeyBytes);

  const client = new AptosClient(network.NODE_URL);

  const mint_event_ticket_payload = {
    type: 'entry_function_payload',
    function:
      '0x782724f50fe42f0109e96d26528137a1c7ca55b5e5cfaa7c81f2b85f81a5ed1f::create_nft_with_resource_and_admin_accounts::mint_event_ticket',
    arguments: [minterAccount.maybeHexString],
    type_arguments: [],
  };

  const mint_event_ticket_txn = await client.generateTransaction(
    receiver.address(),
    mint_event_ticket_payload
  );
  const signedTxn = await client.signTransaction(
    receiver,
    mint_event_ticket_txn
  );
  const txnRes = await client.submitTransaction(signedTxn);
  console.log(txnRes);
};

main();
