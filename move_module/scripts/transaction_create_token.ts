import { AptosClient, AptosAccount, HexString } from 'aptos';
import { minterAccount, network } from '../values';

const main = async () => {
  const minterPrivateKeyBytes = HexString.ensure(
    minterAccount.private_key
  ).toUint8Array();
  const minter = new AptosAccount(minterPrivateKeyBytes);

  const client = new AptosClient(network.NODE_URL);

  const new_token_payload = {
    type: 'entry_function_payload',
    function:
      '0x782724f50fe42f0109e96d26528137a1c7ca55b5e5cfaa7c81f2b85f81a5ed1f::create_nft_with_resource_and_admin_accounts::new_token',
    type_arguments: [],
    arguments: ['collection_name3', 'token_name2', 'token_uri'],
  };

  const new_token_txn = await client.generateTransaction(
    minter.address(),
    new_token_payload
  );
  const signedTxn = await client.signTransaction(minter, new_token_txn);
  const txnRes = await client.submitTransaction(signedTxn);
  console.log(txnRes);
};

main();
