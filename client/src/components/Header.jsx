import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ClientEmailAtom, IsLoggedInAtom } from "../recoil/states";
export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedInAtom);
  const setClientEmail = useSetRecoilState(ClientEmailAtom);

  const { disconnect, connected } = useWallet();

  const router = useRouter();

  function handleLogout() {
    console.log("logout");
    disconnect?.();
    setIsLoggedIn(false);
    setClientEmail("");

    router.push("/");
  }
  return (
    <nav className="header">
      <div className="header__logo">
        <Link href="/" className="header__h1">
          DID You Eat?
        </Link>
      </div>
      <div className="header__button">
        {connected || isLoggedIn ? (
          <button onClick={handleLogout} className="header__login">
            logout
          </button>
        ) : (
          <Link href="/landinglogin">
            <button className="header__login">login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
