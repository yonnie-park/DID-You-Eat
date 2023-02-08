import AdminHeader from "@/src/components/AdminHeader";
import AdminLayout from "@/src/components/AdminLayout";
import { AdminAddressAtom } from "@/src/recoil/states";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

const Admin = () => {
  const router = useRouter();
  const [adminAddress, setAdminAddress] = useRecoilState(AdminAddressAtom);

  const getAptosWallet = () => {
    if ("aptos" in window) {
      console.log(window.aptos);
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };

  const connectAptosWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      console.log(response); // { address: string, address: string }

      const account = await wallet.account();
      setAdminAddress(account.address);

      console.log(account); // { address: string, address: string }
    } catch (error) {
      // { code: 4001, message: "User rejected the request."}
      console.log(error);
    }
  };

  const disconnectAptosWallet = async () => {
    const wallet = getAptosWallet();
    await wallet.disconnect();
  };

  const handleLandingButtonClick = () => {
    if (adminAddress) {
      console.log(adminAddress);
      router.push("/admin/store");
    } else {
      connectAptosWallet();
    }
  };

  return (
    <div className="admin">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <AdminLayout>
        <div className="admin-heading">
          <div className="admin-heading__container">
            <h1 className="admin-heading__h1">
              Introducing the new <br /> SBT and DID information offering system.
            </h1>
            <div onClick={handleLandingButtonClick} className="admin-button__container">
              <div className="admin-button">Start using "Did You Eat" system</div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Admin;
