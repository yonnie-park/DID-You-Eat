import { AptosClient } from "aptos";

// Example Transaction, following an [EntryFunctionPayload](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/src/generated/models/EntryFunctionPayload.ts#L8-L21)

export default async function sendTransaction(args, module_info) {
  const transaction = {
    // arguments: [address, '717'],
    arguments: args,
    // function: '0x1::coin::transfer',
    function: module_info,
    type: "entry_function_payload",
    type_arguments: [],
    // type_arguments: ['0x1::aptos_coin::AptosCoin'],
  };

  try {
    const pendingTransaction = await window.aptos.signAndSubmitTransaction(transaction);

    // In most cases a dApp will want to wait for the transaction, in these cases you can use the typescript sdk
    const client = new AptosClient(process.env.APTOS_CLIENT);
    const txn = await client.waitForTransactionWithResult(pendingTransaction.hash);
    console.log(txn);
    return txn;
  } catch (error) {
    // see "Errors"
    console.log(error);
  }
}
