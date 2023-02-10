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
  const { admin_address, store_name } = router.query;

  const onSignAndSubmitTransaction = async () => {
    const RESOURCE_ACCOUNT_ADDR = "0x39352f60ff417edab7e766af81e8bf8fda21207cf4d9202772be8e6fe20b465d";
    const module_name = "did_you_eat";
    const mint_token_function_name = "mint_token";
    console.log(admin_address, store_name);

    const module_address = `${RESOURCE_ACCOUNT_ADDR}::${module_name}::${mint_token_function_name}`;
    const aptosClient = new AptosClient(process.env.APTOS_CLIENT);
    const payload = {
      type: "entry_function_payload",
      function: module_address,
      type_arguments: [],
      arguments: [account?.address, store_name], // 1 is in Octas
    };
    try {
      const response = await signAndSubmitTransaction(payload);
      // if you want to wait for transaction
      await aptosClient.waitForTransaction(response?.hash || "");
      console.log(response?.hash);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    console.log("client email", clientEmail);
    console.log("client address", clientAddress);
    if (connected)
      onSignAndSubmitTransaction()
        .then((res) => console.log(res))
        .then((res) => router.push("boom?store_name=" + store_name));
    if (clientEmail)
      axios
        .post(process.env.SERVER_URL + "/tokens/mint", {
          email: clientEmail,
          owner_address: admin_address,
          collection_name: store_name,
        })
        .then((res) => console.log(res))
        .then((res) => router.push("/boom?store_name=" + store_name));
  }, []);

  return (
    <div className="boomloading">
      <Loading />
    </div>
  );
}
