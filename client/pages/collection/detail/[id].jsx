import Header from "@/src/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IsLoggedInAtom } from "../../../src/recoil/states";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import axios from "axios";
export default function CollectionDetail() {
  const router = useRouter();
  const { id } = router.query;
  const isLoggedIn = useRecoilValue(IsLoggedInAtom);
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/");
      // alert("Please Login!");
    }
  }, []);

  useEffect(() => {
    axios.get(`http://192.168.0.32:3000/collections/detail/${id}`).then((e) => {
      if (e.data.message) setTokenData(e.data.message);
    });
  }, [id]);

  return (
    <div className="detail">
      <Header />
      <Link className="detail__back" href="/collection">{`<<`}</Link>
      <h1 className="detail__title">{tokenData.shop_name}</h1>
      <div className="detail__col2">
        <img className="detail__image" src={tokenData.collection_uri} width={170} height={170} alt="SBT" />
      </div>
      <div className="detail__info">
        <p>02/09/2023</p>
        <p>{tokenData.location + " " + tokenData.location_detail}</p>
        <p>1번째 방문이에요</p>
      </div>

      <a className="detail__save" href="image link" download>
        <button className="detail__save">이미지저장</button>
      </a>
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
