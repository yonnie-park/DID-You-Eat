import "@/styles/globals.scss";
import { Wallets } from "../src/utils/wallets";
import { RecoilRoot } from "recoil";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AptosWalletAdapterProvider plugins={Wallets} autoConnect={true}>
        <Component {...pageProps} />
      </AptosWalletAdapterProvider>
    </RecoilRoot>
  );
}
