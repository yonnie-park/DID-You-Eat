import Header from "@/src/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IsLoggedInAtom } from "../../src/recoil/states";
import { useRecoilValue } from "recoil";
import Image from "next/image";
export default function CollectionDetail() {
  const router = useRouter();
  const id = Number(router.query.id);
  const isLoggedIn = useRecoilValue(IsLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/");
      // alert("Please Login!");
    }
  }, []);

  return (
    <div className="detail">
      <Header />
      <Link className="detail__back" href="/collection">{`<<`}</Link>
      <h1 className="detail__title">Sushi Yasuda</h1>
      <div className="detail__col2">
        <Image className="detail__image" src="/images/sushi.png" width={170} height={170} alt="SBT" />
      </div>
      <div className="detail__info">
        <p>02/09/2023</p>
        <p>서울시 서초구 반포대로 275</p>
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
