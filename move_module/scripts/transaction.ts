import { AptosClient, AptosAccount } from 'aptos';
import { defAccount, network } from '../values';

const account = new AptosAccount(
  new Uint8Array(Buffer.from(defAccount.private_key)),
  defAccount.maybeHexString
);
const accountAddr = account.address();

const client = new AptosClient(network.NODE_URL);

const set_meta_payload = {
  // type: '',
  function:
    'dfb493794048928dd2026fbaa1e02054d52ffa31851c8ebaf28d187fc1fd2eb8::create_nft_with_resource_and_admin_accounts::set_meta',
  type_arguments: [],
  arguments: [],
};

const mint_event_ticket_payload = {
  function:
    'dfb493794048928dd2026fbaa1e02054d52ffa31851c8ebaf28d187fc1fd2eb8::create_nft_with_resource_and_admin_accounts::mint_event_ticket',
  type_arguments: [],
  arguments: [],
};
