import { AptosClient, AptosAccount, CoinClient } from 'aptos';
import { defAccount, network } from '../values';

const client = new AptosClient(network.NODE_URL);

const coinClient = new CoinClient(client);

const defaultAccount = new AptosAccount(
  new Uint8Array(Buffer.from(defAccount.private_key)),
  defAccount.maybeHexString
);

coinClient.checkBalance(defaultAccount).then((e) => {
  console.log(e);
});
