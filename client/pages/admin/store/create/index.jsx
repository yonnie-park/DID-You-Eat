import AdminLayout from "@/src/components/AdminLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AdminPageHeader from "@/src/components/AdminPageHeader";
import sendTransaction from "../../../../src/utils/sendTransaction";
import { AdminAddressAtom } from "../../../../src/recoil/states";
import { useRecoilValue } from "recoil";

export default function CreateStore() {
  const router = useRouter();
  const adminAddress = useRecoilValue(AdminAddressAtom);
  const storeNameRef = useRef();
  const storeDetailAddressRef = useRef();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "",
  });
  const [store, setStore] = useState({
    name: "",
    address: "",
    detail_address: "",
  });

  const handleStoreAddressInput = (e) => {
    setStore({
      ...store,
      address: e.target.value,
    });
  };

  const handleStoreNameInput = (e) => {
    setStore((prev) => {
      const next = { ...prev };
      next.name = e.target.value;
      return next;
    });
  };

  const handleStoreDetailInput = (e) => {
    setStore((prev) => {
      const next = { ...prev };
      next.detail_address = e.target.value;
      return next;
    });
  };

  const handleImgInputChange = (e) => {
    const newImageFile = e.target.files[0];
    const formData = new FormData();

    formData.append("newImageFile", newImageFile);

    for (const keyvalue of formData) {
      console.log(keyvalue);
    }

    if (newImageFile) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(newImageFile);
      setImage({
        image_file: newImageFile,
        preview_URL,
      });
      console.log(newImageFile);
    }
  };

  const sendFileToIPFS = async (e) => {
    if (image.image_file) {
      try {
        const formData = new FormData();
        formData.append("file", image.image_file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        // console.log(ImgHash);

        return ImgHash;
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const handleCreate = () => {
    if (!store.name) {
      alert("please enter the store name!");
      return;
    }
    if (!store.address) {
      alert("please enter the store address!");
      return;
    }
    if (!image.image_file) {
      alert("please upload store image");
      return;
    }
    sendFileToIPFS().then((res) => {
      const uri = res;
      const RESOURCE_ACCOUNT_ADDR = "0x2fda8a94dcbab8304b6718d53a19af23f6741407c36b98d8bfef3a9a674eb228";
      const module_name = "did_you_eat";
      const create_collection_function_name = "create_collection";

      const args = [store.name, uri];
      const module_address = `${RESOURCE_ACCOUNT_ADDR}::${module_name}::${create_collection_function_name}`;
      //지갑으로 트잭 발생시키고, 서명하고,
      //db에 api 날리기
      sendTransaction(args, module_address).then(() => {
        console.log("adminAddress", adminAddress);
        axios
          .post("http://192.168.0.32:3000/collections/create", {
            shop_name: store.name,
            collection_uri: uri,
            location: store.address,
            location_detail: store.detail_address,
            owner_address: adminAddress,
          })
          .then((res) => {
            console.log(res);
            router.push("/admin/store");
          });
      });
    });
  };

  useEffect(() => {
    return URL.revokeObjectURL(image.preview_URL);
  }, []);

  return (
    <AdminLayout setLoginToggle={undefined}>
      <div className="create-store">
        <AdminPageHeader>Store SBT</AdminPageHeader>
        <div className="create-store__body">
          <h1>Create Store SBT</h1>
          <p>
            You can use every service with just One Store SBT.
            <br />
            Do You Already Have Store SBT?
            <Link href="/admin/store">
              <span> Store List ↘</span>
            </Link>
          </p>
        </div>

        <div className="create-store__fieldset-container">
          <fieldset className="create-store__fieldset">
            <h5 className="create-store-date">
              Created At : {month[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
            </h5>
          </fieldset>
          <fieldset className="create-store__fieldset">
            {/* <h5>매장이름</h5> */}
            <div className="input-area">
              <input ref={storeNameRef} onChange={handleStoreNameInput} type="text"></input>
              <label
                onClick={() => {
                  storeNameRef.current.focus();
                }}
                htmlFor="input"
                className={store.name === "" ? "label-placeholder" : "label-placeholder is-written"}>
                Store Name
              </label>
            </div>
          </fieldset>

          <fieldset className="create-store__fieldset">
            {/* <h5>매장주소</h5> */}
            <div className="input-area">
              <input id="address-input" onChange={handleStoreAddressInput} value={store.address} type="text"></input>
              <label
                htmlFor="input"
                className={store.address === "" ? "label-placeholder" : "label-placeholder is-written"}>
                Store Address
              </label>
            </div>
          </fieldset>

          <fieldset className={store.address === "" ? "create-store__fieldset hide" : "create-store__fieldset"}>
            {/* <h5>매장 상세주소</h5> */}
            <div className="input-area">
              <input ref={storeDetailAddressRef} type="text" onChange={handleStoreDetailInput}></input>
              <label
                onClick={() => {
                  storeDetailAddressRef.current.focus();
                }}
                htmlFor="input"
                className={store.detail_address === "" ? "label-placeholder" : "label-placeholder is-written"}>
                Detail Address
              </label>
            </div>
          </fieldset>

          <fieldset className="create-store__fieldset">
            <h5>SBT Image</h5>
            <div className="create-store__img_input">
              <div className="linear-background">
                <label htmlFor="img_file">
                  <h5>Upload Store SBT</h5>
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="#f7f9f9" width="45px">
                    <g>
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="post_img"
                  className="createpost__img-input"
                  onChange={handleImgInputChange}
                  onClick={(e) => (e.target.value = null)}
                  id="img_file"></input>
              </div>
              {!!image.preview_URL && <Image src={image.preview_URL} alt="miler" width={250} height={250}></Image>}
            </div>
            <div className="img-requirement">
              <h6>Image requirement</h6>
              <ul>
                <li>png, gif Only</li>
                <li>Recommended: measures 500x500px, round shape, size less than 200KB (Max. 4MB)</li>
              </ul>
            </div>
          </fieldset>
          <fieldset className="create-store__fieldset">
            <div onClick={handleCreate} className="classic-button yellow-color  margin-auto">
              Create
            </div>
          </fieldset>
        </div>
      </div>
    </AdminLayout>
  );
}
