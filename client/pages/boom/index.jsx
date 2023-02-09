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
        <h1>Sushi Yasuda</h1>
        <Image className="boom__circle" src="/images/sushi.png" width={250} height={250}></Image>

        <p>서울시 서초구 반포대로 275</p>
        <p>It's your 1st visit!</p>
        <Link href="/collection">
          <button className="boom__close">go to collection</button>
        </Link>
      </div>
    </div>
  );
}