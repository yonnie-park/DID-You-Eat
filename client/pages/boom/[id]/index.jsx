import Link from "next/link";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";
import { useRouter } from "next/router";
export default function Boom(props) {
  const router = useRouter();
  const id = Number(router.query.id);
  return (
    <div className="boom">
      <div className="boom__info">
        <ConfettiExplosion />
        <h1>{props ? props.title : "restaurant title"}</h1>
        <Image className="boom__circle" src="/images/sushi.png" width={250} height={250}></Image>

        <p>{props ? props.address : "restaurant address"}</p>
        <p>It's your 1st visit!</p>
        <Link href="/collection">
          <button className="boom__close">go to collection</button>
        </Link>
      </div>
    </div>
  );
}
