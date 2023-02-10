import { AptosAccount, FaucetClient } from 'aptos';
import { network } from './values';

const generateAccount = async () => {
  const newAccount = new AptosAccount();
  const faucetClient = new FaucetClient(network.NODE_URL, network.FAUCET_URL);
  await faucetClient.fundAccount(newAccount.address(), 100_000_000);
  return {
    pubkey: newAccount.pubKey().toString(),
    address: newAccount.address().toString(),
    prikey: newAccount.toPrivateKeyObject().privateKeyHex,
  };
};

export { generateAccount };
