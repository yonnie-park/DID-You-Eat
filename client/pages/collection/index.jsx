import Header from "@/src/components/Header";
import SBT from "@/src/components/SBT";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { IsLoggedInAtom } from "../../src/recoil/states";

export default function Collection() {
  const isLoggedIn = useRecoilValue(IsLoggedInAtom);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/landinglogin");
      // alert("Please Login!");
    }
  }, []);

  return (
    <div className="collection">
      <Header />
      <div className="landing__main">
        <h1 className="collection__h1">My Collection</h1>
        <div className="collection__row">
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
          <SBT />
        </div>
      </div>
    </div>
  );
}
