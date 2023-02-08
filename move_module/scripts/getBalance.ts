import { AptosClient, AptosAccount, CoinClient } from 'aptos';
import { defAccount, minterAccount, network } from '../values';

const client = new AptosClient(network.NODE_URL);

const coinClient = new CoinClient(client);
const checkAccount = defAccount;

const balCheckAccount = new AptosAccount(
  new Uint8Array(Buffer.from(checkAccount.private_key)),
  checkAccount.maybeHexString
);

coinClient.checkBalance(balCheckAccount).then((e) => {
  console.log(e);
});
