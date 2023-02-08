import { AptosClient, AptosAccount, HexString } from 'aptos';
import { minterAccount, network } from '../values';

const main = async () => {
  const testMinterPrivateKeyBytes = HexString.ensure(
    minterAccount.private_key
  ).toUint8Array();
  const testMinter = new AptosAccount(testMinterPrivateKeyBytes);

  const client = new AptosClient(network.NODE_URL);

  const set_collection_payload = {
    type: 'entry_function_payload',
    function:
      '0x782724f50fe42f0109e96d26528137a1c7ca55b5e5cfaa7c81f2b85f81a5ed1f::create_nft_with_resource_and_admin_accounts::create_collection',
    type_arguments: [],
    arguments: ['collection_name3', 'description', 'collection_uri'],
  };

  const set_meta_txn = await client.generateTransaction(
    testMinter.address(),
    set_collection_payload
  );
  // console.log(set_meta_txn);
  const signedTxn = await client.signTransaction(testMinter, set_meta_txn);
  console.log(signedTxn);
  const txnRes = await client.submitTransaction(signedTxn);
  console.log(txnRes);
};

main();