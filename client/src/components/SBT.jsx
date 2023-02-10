import Link from "next/link";
import Image from "next/image";

export default function SBT(props) {
  return (
    <Link href={"/collection/detail/" + props.collection_name}>
      <div className="collection__col1">
        <img alt="SBT" src={props.imgUrl} width={70} height={70} />
      </div>
    </Link>
  );
}
