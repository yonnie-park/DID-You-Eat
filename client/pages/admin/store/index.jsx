import AdminCollection from "@/src/components/AdminCollection";
import AdminLayout from "@/src/components/AdminLayout";
import AdminPageHeader from "@/src/components/AdminPageHeader";
import axios from "axios";
import { AdminAddressAtom } from "@/src/recoil/states";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Store({ data }) {
  const adminAddress = useRecoilValue(AdminAddressAtom);
  const router = useRouter();
  useEffect(() => {
    if (!adminAddress) router.push("/admin");
  }, [adminAddress]);
  useEffect(() => {
    let storeData;
    axios.get(`http://192.168.0.32:3000/collections/${adminAddress}`).then((res) => {
      storeData = res;
      console.log(storeData);
    });
  }, [adminAddress]);

  return (
    <AdminLayout>
      <AdminPageHeader>My Store</AdminPageHeader>
      <h2 className="semi-title">List</h2>
      <div className="admin-store__collection-list">
        <Link href="/admin/store/1">
          <AdminCollection></AdminCollection>
        </Link>
        <Link href="/admin/store/create">
          <div className="admin-store__create-collection">
            <span>Create New Store Collection!</span>
          </div>
        </Link>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();
  const data = {};

  // Pass data to the page via props
  return { props: { data } };
}
