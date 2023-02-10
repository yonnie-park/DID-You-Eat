import Header from "@/src/components/Header";
import SBT from "@/src/components/SBT";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";
import { set } from "immutable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ClientEmailAtom, IsLoggedInAtom } from "../../src/recoil/states";

export default function Collection(props) {
  const isLoggedIn = useRecoilValue(IsLoggedInAtom);
  const router = useRouter();
  const { connected, account } = useWallet();
  const clientEmail = useRecoilValue(ClientEmailAtom);
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/");
      // alert("Please Login!");
    }
  }, []);

  useEffect(() => {
    if (connected) {
      axios
        .get(process.env.SERVER_URL + "/tokens/" + account?.address)
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            setTokenList(res.message.token_lists);
            console.log(res.message);
          }
        });
    }
  }, [connected]);

  useEffect(() => {
    if (clientEmail) {
      axios
        .get(process.env.SERVER_URL + "/tokens/email/" + clientEmail)
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            setTokenList(res.message.token_lists);
            console.log(res.message);
          }
        });
    }
  }, [clientEmail]);

  return (
    <div className="collection">
      <Header />
      <div className="landing__main">
        <h1 className="collection__h1">My Collection</h1>
        <div className="collection__row">
          {tokenList?.length > 0
            ? tokenList.map((e) => {
                return <SBT imgUrl={e.uri} collection_name={e.collection_name} />;
              })
            : "You don't have a collection yet."}
        </div>
      </div>
      <style jsx global>
        {`
          body {
            background: #f5f7ed;
          }
        `}
      </style>
    </div>
  );
}
