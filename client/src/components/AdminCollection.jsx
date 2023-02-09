import Image from "next/image";

export default function AdminCollection(props) {
  return (
    <div className="admin-collection">
      <img alt="" src={props.imgUrl}></img>
    </div>
  );
}
