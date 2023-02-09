import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import aptos from "@/public/images/aptos-logo.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { IsLoggedInAtom } from "../recoil/states";
import { useRouter } from "next/router";

export default function ConnectWalletButton() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedInAtom);
  const { connect, account, connected, disconnect, wallets } = useWallet();

  useEffect(() => {
    if (connected) {
      setIsLoggedIn(true);
      const isBoomlogin = JSON.parse(localStorage.getItem("isBoomLogin"));
      const admin_address = localStorage.getItem("admin_address");
      const store_name = localStorage.getItem("store_name");
      setModalVisible(false);

      if (isBoomlogin) {
        router.push("/boomloading?admin_address=" + admin_address + "&store_name=" + store_name);
      } else {
        router.push("/landingloading");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [connected]);

  const abbreviateAddress = (address, length = 6) => {
    if (!address) return;
    if (address === "Guest") return "Guest";
    let start = address.substring(0, length);
    let end = address.substring(address.length - length);

    let result = start + "..." + end;

    return result;
  };

  return (
    <>
      <button id="petra-button" className="login-button" onClick={() => setModalVisible(true)}>
        <Image alt="aptos" src={aptos}></Image>
        {connected && account ? abbreviateAddress(account.address) : "Connect Wallet"}
      </button>
      {modalVisible && (
        <div className="connect-wallet-modal" onClick={() => setModalVisible(false)}>
          <div className="wallet-container" onClick={(e) => e.stopPropagation()}>
            <svg
              onClick={() => setModalVisible(false)}
              className="plus-button"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt"
              height="512.000000pt"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
                <path
                  d="M2492 5109 c-45 -13 -108 -80 -121 -126 -7 -26 -11 -392 -11 -1130
l0 -1093 -1113 -2 -1113 -3 -41 -27 c-63 -41 -88 -90 -88 -169 0 -54 5 -72 27
-106 15 -22 44 -51 65 -64 l38 -24 1112 -3 1113 -2 2 -1113 3 -1112 24 -38
c13 -21 42 -50 64 -65 34 -23 52 -27 107 -27 55 0 73 4 107 27 22 15 51 44 64
65 l24 38 3 1112 2 1113 1113 2 1112 3 38 24 c21 13 50 42 65 64 23 34 27 52
27 107 0 55 -4 73 -27 107 -15 22 -44 51 -65 64 l-38 24 -1112 3 -1113 2 -2
1113 -3 1112 -24 38 c-47 76 -151 113 -239 86z"
                />
              </g>
            </svg>
            <h1>Did You Eat?</h1>
            <div>Connect Wallet</div>

            <div className="wallet-list-container">
              {wallets.map(({ name, icon, url, readyState }) => {
                const installed = readyState === "Installed";
                const borderColor = installed ? "border-white" : "border-gray";

                const textColor = installed ? "text-white" : "text-gray";

                return (
                  <div
                    key={name}
                    className={` ${borderColor} ${textColor}`}
                    onClick={() => {
                      if (!installed) {
                        window.open(url, "_blank");
                        return;
                      }
                      connect(name);
                    }}>
                    <div className="wallet-item">
                      <div className="">
                        <Image src={icon} alt="" width={24} height={24}></Image>

                        <div className="">{name}</div>
                      </div>
                    </div>

                    <div className={`wallet-item-button ${borderColor}`}>{installed ? "Connect" : "Install"}</div>
                  </div>
                );
              })}
            </div>
            {connected && account && (
              <button id="petra-button" className="login-button" onClick={() => disconnect?.()}>
                <Image src={aptos} alt=""></Image>
                Disconnect {abbreviateAddress(account.address)}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
