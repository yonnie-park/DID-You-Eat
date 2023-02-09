import { AptosClient, AptosAccount, HexString } from "aptos";
import {
  minterAccount,
  network,
  RESOURCE_ACCOUNT_ADDR,
  module_name,
  create_collection_function_name,
} from "../values";

const main = async () => {
  const minterPrivateKeyBytes = HexString.ensure(
    minterAccount.private_key
  ).toUint8Array();
  const minter = new AptosAccount(minterPrivateKeyBytes);

  const client = new AptosClient(network.NODE_URL);

  const set_collection_payload = {
    type: "entry_function_payload",
    function: `${RESOURCE_ACCOUNT_ADDR}::${module_name}::${create_collection_function_name}`,
    type_arguments: [],
    arguments: ["collection_name", "https://www.naver.com"],
  };

  const set_meta_txn = await client.generateTransaction(
    minter.address(),
    set_collection_payload
  );
  // console.log(set_meta_txn);
  const signedTxn = await client.signTransaction(minter, set_meta_txn);
  console.log(signedTxn);
  const txnRes = await client.submitTransaction(signedTxn);
  console.log(txnRes);
};

main();
