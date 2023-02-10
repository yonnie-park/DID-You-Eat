import Link from "next/link";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Boom(props) {
  const router = useRouter();
  const [tokenData, setTokenData] = useState([]);
  const { store_name } = router.query;

  useEffect(() => {
    axios.get(process.env.SERVER_URL + `/collections/detail/${store_name}`).then((e) => {
      if (e.data.message) setTokenData(e.data.message);
    });
  }, [store_name]);

  return (
    <div className="boom">
      <div className="boom__info">
        <ConfettiExplosion />
        <h1>{tokenData.shop_name}</h1>
        <img className="boom__circle" src={tokenData.collection_uri} width={250} height={250}></img>

        <p>{tokenData.location + " " + tokenData.location_detail}</p>
        <p>It's your 1st visit!</p>
        <Link href="/collection">
          <button className="boom__close">go to collection</button>
        </Link>
      </div>
    </div>
  );
}
