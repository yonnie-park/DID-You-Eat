import AdminLayout from "@/src/components/AdminLayout";
import AdminPageHeader from "@/src/components/AdminPageHeader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import storImg from "@/public/images/sushi.png";
import { useRecoilValue } from "recoil";
import { AdminAddressAtom } from "../../../../src/recoil/states";

const StoreDetail = () => {
  const router = useRouter();
  const id = Number(router.query.id);
  const [toggleImageQr, setToggleImageQr] = useState(false);
  const [toggleDetail, setToggleDetail] = useState(false);

  const adminAddress = useRecoilValue(AdminAddressAtom);

  return (
    <AdminLayout>
      <div className="store-detail">
        <AdminPageHeader>Store Detail</AdminPageHeader>
        <div className="store-detail__container">
          <div className="store-detail__title">
            <h1>Sushi Yasuda</h1>
            <p>
              Sushi Yasuda Store SBT Detail
              <br />
              {/* Store NFT를 가지고 계십니까?{" "} */}
              <Link href="/admin/store">
                <span> Stores↘</span>
              </Link>
            </p>
          </div>
          <div
            onClick={() => {
              setToggleImageQr(!toggleImageQr);
            }}
            className={toggleImageQr ? "store-detail__image-qr bigger" : "store-detail__image-qr"}>
            <Image src={storImg} alt="miler" width={230} height={230}></Image>
            {/* <Image className="qrexample" src="/images/didyoueatqr.png" alt="qrexample" width={230} height={230}></Image> */}
            <QRCodeSVG
              value={process.env.CLIENT_URL + "/boomlogin?admin_address=" + adminAddress + "&store_name=" + id}
              size={230}
              bgColor={"#000000"}
              fgColor={"#daff5b"}
              level={"L"}
              includeMargin={false}
              // imageSettings={{
              //   src: "https://static.zpao.com/favicon.png",
              //   x: undefined,
              //   y: undefined,
              //   height: 24,
              //   width: 24,
              //   excavate: true,
              // }}
            />
          </div>
          <div className="store-detail__description">
            <p>Store Name: Sushi Yasuda</p>
            <p>Created At: December 25, 2021</p>
            <p>Store Address: 서울시 서초구 서초대로 72길 178-12</p>
          </div>
          <div className="store-detail__description__detail">
            <h2
              onClick={() => {
                setToggleDetail(!toggleDetail);
              }}>
              More Detail
              <div className={toggleDetail ? "plus-button rotate-x" : "plus-button"}></div>
            </h2>
            <p className={toggleDetail ? "show " : "hide"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum rerum cum suscipit doloribus
              repudiandae voluptate magnam, quod dolores blanditiis ad voluptatem velit sed accusantium culpa, quibusdam
              voluptates alias maiores animi, illum impedit veritatis eveniet amet recusandae! Expedita, harum itaque
              nobis numquam optio unde sint, quos a recusandae alias maxime quia atque repellat rerum laborum quis ipsum
              doloremque aliquid velit? Praesentium voluptas perferendis nisi vero. Corporis excepturi asperiores odio!
              Eum possimus magni id tempore iusto temporibus facilis magnam! Explicabo culpa nemo modi, fugiat labore
              minima sequi, ipsum, eum aspernatur rerum sit fuga? Nihil id, ullam aspernatur tempore optio reiciendis
              unde porro aliquid, sequi earum minima fuga tenetur dolores voluptate sint maiores adipisci voluptates
              quibusdam odit! Accusantium possimus deleniti consectetur qui, voluptatem eligendi explicabo. Doloribus,
              illum voluptatibus, in aperiam hic repellat vitae, exercitationem vero iusto ex odit temporibus quaerat
              itaque libero accusantium. Sit quo tenetur sint, ducimus esse nihil impedit tempora veritatis itaque
              vitae? Eveniet nesciunt amet corporis possimus ad esse ex consequatur architecto! Ullam sequi laboriosam
              minus aliquam accusamus saepe ipsam blanditiis molestias maiores. Eveniet odit amet modi aperiam cum nulla
              quibusdam explicabo, adipisci nam ex fuga, sint soluta accusantium ad porro. Aut asperiores sequi quisquam
              eum doloremque cupiditate fugit quaerat numquam quas cumque laudantium, architecto, dolor culpa? Aperiam
              vitae magni earum aut, quia repellat dolorum, soluta labore voluptas recusandae at est cum omnis iure
              tenetur hic sapiente harum tempore excepturi assumenda impedit pariatur et. Exercitationem porro nisi
              optio iste ipsa obcaecati nulla esse, doloremque laborum veniam perferendis accusantium tempore incidunt,
              temporibus labore voluptatem ea dolores molestiae soluta, officiis facilis molestias quas cum! Pariatur
              consequuntur dolor atque. Nisi consectetur, qui incidunt, maxime, at voluptatem quod tempore totam labore
              doloremque quae odit facere fugiat. Quo id, ipsam unde hic sit illo iusto doloribus fugit, fugiat
              reiciendis corporis nihil quisquam molestias ex?
            </p>
          </div>
          <div className="store-detail__description__link">
            <Link href="/admin/store/1/stat">
              <div className="classic-button yellow-color">매장통계 보러가기</div>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StoreDetail;
