import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AdminAddressAtom } from "../recoil/states";

export default function AdminHeader() {
  const [adminAddress, setAdminAddress] = useRecoilState(AdminAddressAtom);
  const [isPetraConnected, setIsPetraConnected] = useState(false);
  const [isPetraCliked, setIsPetraCliked] = useState(false);

  const getAptosWallet = () => {
    if ("aptos" in window) {
      console.log(window.aptos);
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };

  const connectAptosWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      console.log(response); // { address: string, address: string }

      const account = await wallet.account();
      setAdminAddress(account.address);

      console.log(account); // { address: string, address: string }
      setIsPetraConnected(true);
    } catch (error) {
      // { code: 4001, message: "User rejected the request."}
      console.log(error);
    }
  };

  const disconnectedAptosWallet = async () => {
    const wallet = getAptosWallet();
    await wallet.disconnect();
    setIsPetraConnected(false);
    setAdminAddress("");
  };

  useEffect(() => {
    const isPetraInstalled = window.aptos;
    if (isPetraCliked) {
      connectAptosWallet();
      setIsPetraCliked(false);
    }
    if (isPetraCliked && isPetraConnected) {
      disconnectedAptosWallet();
      setIsPetraCliked(false);
    }
  }, [isPetraCliked]);

  useEffect(() => {
    if (adminAddress) {
      setIsPetraConnected(true);
    } else {
      setIsPetraConnected(false);
    }
  }, [adminAddress]);

  return (
    <nav className="admin-header">
      <div className="admin-header__container">
        <Link href="/admin">
          <div className="admin-header__home-button">Did You Eat?</div>
        </Link>
        <div
          onClick={() => {
            setIsPetraCliked(true);
          }}
          className="admin-header__connect-button">
          {isPetraConnected ? <span>Disconnect wallet</span> : <span>Connect wallet</span>}
        </div>
      </div>
    </nav>
  );
}
