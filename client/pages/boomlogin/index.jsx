import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import petra from "@/public/images/petra.jpg";
import googleLogo from "@/public/images/googleLogo.png";
import lying_man from "@/public/images/lying_man.png";
import Link from "next/link";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { ClientAddressAtom, IsLoggedInAtom } from "../../src/recoil/states";
import ConnectWalletButton from "../../src/components/ConnectWallet";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const clientId = "770315293419-o8eldl0qi9germp2s3gtn7i91r83qghp.apps.googleusercontent.com";
const GoogleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/redirect&scope=https://www.googleapis.com/auth/userinfo.email`;

export default function LandingLogin() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedInAtom);
  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const id = Number(router.query.id);
  const { admin_address, store_name } = router.query;

  useEffect(() => {
    const oAuthHandler = () => {
      window.location.assign(GoogleURL);
      setIsGoogleClicked(false);
    };
    if (isGoogleClicked) {
      localStorage.setItem("isBoomLogin", "true");
      localStorage.setItem("admin_address", admin_address);
      localStorage.setItem("store_name", store_name);
      oAuthHandler();
    }
  }, [isGoogleClicked]);

  return (
    <div className="qr-mint">
      <div className="qr-mint__header">
        <Link href="/" className="header__h1">
          DID You Eat?
        </Link>
      </div>
      <div className="qr-mint__container">
        <div className="qr-mint__body">
          <Image alt="lying-man" className="lying-man" src={lying_man}></Image>
          <div className="qr-mint__login-box">
            <button
              onClick={() => {
                setIsGoogleClicked(true);
              }}
              className="login-button">
              <Image alt="google" src={googleLogo}></Image>
              <span className="login-button__word">Login with Google</span>
            </button>

            <div className="line">
              <div className="line__or">OR</div>
            </div>
            <ConnectWalletButton></ConnectWalletButton>
          </div>
          <p className="qr-mint__footer">
            If you already have Petra, you can connect here.<br></br>
            If you don't, you can log in with your Google account.<br></br>
            You can later send your tokens to your Petra wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
