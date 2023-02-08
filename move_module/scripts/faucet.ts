import { FaucetClient } from 'aptos';
import { defAccount, minterAccount, network } from '../values';

const faucetClient = new FaucetClient(network.NODE_URL, network.FAUCET_URL);

const faucetValue = 100_000_000;
const faucetAccount = defAccount;

faucetClient
  .fundAccount(faucetAccount.maybeHexString, faucetValue)
  .then((e) =>
    console.log(
      `Faucet Success!\nAccount : ${faucetAccount.maybeHexString}\nAmount : ${faucetValue}`
    )
  )
  .catch((e) => console.log('failed'));
