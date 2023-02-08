import { FaucetClient } from 'aptos';
import { defAccount, network } from '../values';

const faucetClient = new FaucetClient(network.NODE_URL, network.FAUCET_URL);

const faucetValue = 100_000_000;

faucetClient
  .fundAccount(defAccount.maybeHexString, faucetValue)
  .then((e) =>
    console.log(
      `Faucet Success!\nAccount : ${defAccount.maybeHexString}\nAmount : ${faucetValue}`
    )
  )
  .catch((e) => console.log('failed'));
