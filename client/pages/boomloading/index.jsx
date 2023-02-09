import Loading from "@/src/components/Loading";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ClientAddressAtom, ClientEmailAtom } from "../../src/recoil/states";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { useRouter } from "next/router";
import axios from "axios";

export default function Boomloading(props) {
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();
  const clientAddress = useRecoilValue(ClientAddressAtom);
  const clientEmail = useRecoilValue(ClientEmailAtom);
  const router = useRouter();

  const onSignAndSubmitTransaction = async () => {
    const RESOURCE_ACCOUNT_ADDR = "0x2fda8a94dcbab8304b6718d53a19af23f6741407c36b98d8bfef3a9a674eb228";
    const module_name = "did_you_eat";
    const mint_token_function_name = "mint_token";

    const module_address = `${RESOURCE_ACCOUNT_ADDR}::${module_name}::${mint_token_function_name}`;
    const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
    const payload = {
      type: "entry_function_payload",
      function: module_address,
      type_arguments: [],
      arguments: [account?.address, "aptos hackathon"], // 1 is in Octas
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      // if you want to wait for transaction
      await aptosClient.waitForTransaction(response?.hash || "");
      console.log(response?.hash);

      router.push("/boom");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("client address", clientAddress);
    if (connected) onSignAndSubmitTransaction().then((res) => console.log(res));
    // if(clientEmail) axios.post()
  }, []);

  return (
    <div className="boomloading">
      <Loading />
    </div>
  );
}
