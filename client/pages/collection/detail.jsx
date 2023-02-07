import Header from "@/src/components/Header";
import Link from "next/link";
export default function CollectionDetail() {
  return (
    <div className="detail">
      <Header />
      <Link className="detail__back" href="/collection">{`<<`}</Link>
      <h1 className="detail__title">Restaurant Name</h1>
      <div className="detail__col2"></div>
      <div className="detail__info">
        <p>00/00/00</p>
        <p>서울시 서초구 반포대로 275</p>
        <p>0번째 방문이에요</p>
      </div>

      <a className="detail__save" href="image link" download>
        <button className="detail__save">이미지저장</button>
      </a>
    </div>
  );
}
